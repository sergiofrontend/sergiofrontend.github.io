(function () {
    'use strict';

    angular.module('angularGallery', ['gallery.service', 'templates', 'pusher-angular'])
        .directive('angularGallery', gallery)
        .controller('GalleryController', ['$scope', '$timeout', '$pusher', 'galleryService', GalleryController]);

    function gallery() {
        return {
            restrict: 'E',
            templateUrl: 'gallery.directive.html',
            scope: {
                galleryDataUrl: '@', // url for getting gallery contents
                pusherKey: '@', // your pusher service api key
                pusherChannel: '@', // the channel of your pusher service you want to subscribe
                pusherEvent: '@', // the pusher event you want to bind 
                pushedDataName: '@' // the attribute name in the data pushed from your pusher service
            },
            link: link,
            controller: 'GalleryController',
            controllerAs: 'vm'
        };
    }

    function GalleryController($scope, $timeout, $pusher, galleryService) {
        var vm = this,
            galleryDataUrl = $scope.galleryDataUrl,
            paginationQuery = 'page', // the name used in the pagination query, for example your/url?page=1
            chunkSize = 4, // the number of items per row
            init = true; // true if this controller is loaded the first time, and is set to false after it is loaded

        // load gallery contents
        loadData(galleryDataUrl);

        vm.galleryData = {};
        vm.items = [];
        vm.pages = [];
        chunk(chunkSize);
        pages();
        vm.isImage = isImage;
        vm.isVideo = isVideo;
        vm.multiPage = multiPage;
        vm.paginationUrl = paginationUrl;
        vm.isCurrent = isCurrent;
        vm.showPage = showPage;
        vm.prev = prev;
        vm.next = next;

        function loadData(url) {
            // call service to retrieve contents, the service returns promise
            galleryService.query(url)
                .then(success, fail);

            // successfully get the contents from the server
            function success(res) {
                vm.galleryData = res; // get the paginated data info, the data including pagination info and the contents info
                vm.items = vm.galleryData.data; // get the contents info
                chunk(chunkSize); // chunk contents into rows
                pages(); // load page info
                modalListenToCloseEvent('.modal'); // add close event listener on modals so that when the modal is closed the video will stop and restart
                if (init) { // if this controller is loaded the first time, load the pusher client
                    loadPusher();
                    init = false;
                }
            }

            // fail to get the contents from the server
            function fail(errors) {
                vm.errors = errors;
            }
        }

        function loadPusher() {
            var apiKey = $scope.pusherKey,
                channel = $scope.pusherChannel,
                event = $scope.pusherEvent;
            if (!apiKey || !channel) {
                return;
            }
            var client = new Pusher(apiKey),
                pusher = $pusher(client),
                ch = pusher.subscribe(channel);
            ch.bind(event, appendToGallery); // when new content is pushed, append it to the gallery if necessary
        }

        function appendToGallery(data) {
            // if the current page is not the last page, do nothing
            if (!isCurrent(vm.pages.length)) {
                return;
            }
            var chunk = vm.chunk, // get chunk info
                pushedDataName = $scope.pushedDataName, // get the attribute name of the pushed data
                item = data[pushedDataName]; // get the pushed content
            if (chunk.length === 0 ||
                chunk[chunk.length - 1].length === chunkSize && vm.galleryData.data.length < vm.galleryData.per_page) { // a new chunk needs to be created
                var arr = [];
                arr.push(item);
                chunk.push(arr);
                vm.items.push(item);
                modalListenToCloseEvent('#' + item.id);
            } else if (chunk[chunk.length - 1].length < chunkSize) { // append to the last chunk
                chunk[chunk.length - 1].push(item);
                vm.items.push(item);
                modalListenToCloseEvent('#' + item.id);
            } else if (vm.galleryData.data.length === vm.galleryData.per_page) { // a new page needs to be created
                vm.pages.push(vm.pages.length + 1);
            }
        }

        function modalListenToCloseEvent(target) {
            $timeout(function () { // use $timeout to make sure the following function is executed after the template is loaded
                $(target).on('hidden.bs.modal', function (e) { // listen to the close modal event
                    var video = $(this).find('video');
                    video.attr('src', video.attr('src')); // reset the src attribute to make it stop and restart
                });
            });
        }

        function chunk(size) {
            var chunks = [], items = vm.items, length = items.length;
            for (var i = 0; i < length; i += size) {
                chunks.push(items.slice(i, i + size));
            }
            vm.chunk = chunks;
        }

        function isImage(mimeType) {
            if (!mimeType) {
                return false;
            }
            return mimeType.indexOf('image') > -1; // check if the mime type contains 'image'
        }

        function isVideo(mimeType) {
            if (!mimeType) {
                return false;
            }
            return mimeType.indexOf('video') > -1; // check if the mime type contains 'video'
        }

        // generate the pages array for ng-repeat iteration in template 
        function pages() {
            if (jQuery.isEmptyObject(vm.galleryData)) {
                vm.pages = [];
                return;
            }
            var total = vm.galleryData.last_page, arr = [];
            for (var i = 1; i <= total; i++) {
                arr.push(i);
            }
            vm.pages = arr;
        }

        function multiPage() {
            return vm.pages.length > 1; // check if there is more than one page
        }

        function paginationUrl(page) {
            return galleryDataUrl + '?' + paginationQuery + '=' + page; // generate url for a specific page
        }

        function isCurrent(page) {
            if (jQuery.isEmptyObject(vm.galleryData)) {
                return false;
            }
            return vm.galleryData.last_page === 0 || vm.galleryData.current_page === page; // when last_page is 0, there is no content and return true directly
        }

        function showPage(page) {
            loadData(paginationUrl(page)); // when click the button for specific page, load the data for that page
        }

        // load the previous page
        function prev() {
            var prevUrl = vm.galleryData.prev_page_url;
            if (!prevUrl) {
                return;
            }
            loadData(galleryDataUrl + prevUrl);
        }

        // load the next page
        function next() {
            var nextUrl = vm.galleryData.next_page_url;
            if (!nextUrl) {
                return;
            }
            loadData(galleryDataUrl + nextUrl);
        }
    }


    function link(scope, element, attrs) {
        element.on('$destroy', cleanup);
    }

    function cleanup() {
        console.debug('angular-gallery destroyed!');
    }


})();
(function () {
    'use strict';

    angular.module('gallery.service', [])
        .factory('galleryService', galleryService);

    galleryService.$inject = ['$q', '$http'];

    function galleryService($q, $http) {
        return {
            query: query // the function that send request to retrive data of a specific page
        };

        function query(url) {
            return $http.get(url)
                .then(success, fail);

            function success(res) {
                return res.data; // if successfully retrieve data, return it in the promise
            }

            function fail(res) {
                var errors = res.data;
                return $q.reject(errors); // if fail to retrieve data, return the error messages in the promise
            }
        }
    }
})();

angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("gallery.directive.html","<div ng-repeat=\"row in vm.chunk\" class=\"row\">\n    <div ng-repeat=\"item in row\"\n         class=\"col-xs-10 col-xs-offset-1 col-sm-5 col-sm-offset-1 col-md-3 col-md-offset-0 col-lg-3 col-lg-offset-0\"\n         style=\"margin-bottom: 5px;\">\n        <a data-toggle=\"modal\" href=\"#{{item.id}}\">\n            <img ng-src=\"{{item.thumbnail}}\"\n                 alt=\"{{item.title}}\"\n                 style=\"width: 100%;\">\n        </a>\n    </div>\n</div>\n\n<nav class=\"text-center\" ng-if=\"vm.multiPage()\">\n    <ul class=\"pagination\">\n        <li><a href=\"\" ng-click=\"vm.prev()\">&laquo;</a></li>\n        <li ng-repeat=\"page in vm.pages\" ng-class=\"{active: vm.isCurrent(page)}\">\n            <a href=\"\" ng-click=\"vm.showPage(page)\">{{page}}</a>\n        </li>\n        <li><a href=\"\" ng-click=\"vm.next()\">&raquo;</a></li>\n    </ul>\n</nav>\n\n<div ng-repeat=\"item in vm.items\" class=\"modal fade\" id=\"{{item.id}}\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">{{item.title}}</h4>\n            </div>\n            <div class=\"modal-body\">\n                <img ng-if=\"vm.isImage(item.type)\"\n                     ng-src=\"{{item.href}}\"\n                     alt=\"{{item.title}}\"\n                     style=\"width: 100%;\">\n\n                <video ng-if=\"vm.isVideo(item.type)\"\n                       src=\"{{item.href}}\"\n                       poster=\"{{item.poster}}\"\n                       controls\n                       style=\"width: 100%;\"></video>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>");}]);
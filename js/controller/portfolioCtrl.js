app.controller('portfolioCtrl', function($scope, $http, $timeout, Lightbox, worksAPI){

  $scope.findWork = "";/*input radio select checked*/
	$scope.works = [];

	var carregarPortfolio = function () {
		worksAPI.getWorks().success(function(data){
			$scope.works = data;
		});
	};

  $scope.openLightboxModal = function (index) {
  	console.log(index);
    Lightbox.openModal(works.images, index);
  };
  	$scope.openBox = function(box) {
  		$scope.activeBox = box;
  		$timeout(function(){
  			$scope.sizeBox = box;
  		}, 1000);  	
  	}  

  	$scope.closeBox = function(){
  		$scope.sizeBox = box;
  		$timeout(function(){
  			$scope.activeBox = box;
  		},1000);
  	}


	$scope.openLightboxModal = function (work, index) {
  		console.log(work.images);
  		Lightbox.openModal(work.images, index);
	};

  
  carregarPortfolio();


});
app.provider("worksAPI", function(){
	this.$get = function($http, config) {
		return {
			getWorks: function() {
				var link = $http.get(config.baseUrl + "js/portfolio.json");
				return link;
			}
		};
	};
});



/*app.service("worksAPI", function ($http) {
	this.getWorks = function () {
		return $http.get("js/portfolio.json");
	};
});
app.factory("worksAPI", function ($http) {
	var _getWorks = function () {
		return $http.get("js/portfolio.json");
	};

	return {
		getWorks: _getWorks,
	};
});*/
app.controller('contactCtrl', function($scope, config) {
	
	$scope.facebook = {"icon":"","src": ""};
	$scope.facebook.icon = config.facebook.icon;
	$scope.facebook.src = config.facebook.link;

	$scope.linkedin = {"icon":"","src": ""};
	$scope.linkedin.icon = config.linkedin.icon;
	$scope.linkedin.src = config.linkedin.link;
		

});
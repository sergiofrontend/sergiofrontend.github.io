app.controller('aboutCtrl', function($scope, animateElementAPI) {
  
	$scope.title = "Web Designer & Front-end";
	$scope.src = "img/about/boy1.png";
	$scope.pessoa = {
		descname: "Name ID", 
		name: "Sergio Antonio",
		descage: "Age",
		age: "29 Years Old",
		desccontry: "Contry of birth",
		contry: "Portugal"
	};

	$scope.animateElementInLEFT = animateElementAPI.animateElementInLEFT;
	$scope.animateElementOutLEFT = animateElementAPI.animateElementOutLEFT;
	$scope.animateElementInRIGHT = animateElementAPI.animateElementInRIGHT;
	$scope.animateElementOutRIGHT = animateElementAPI.animateElementOutRIGHT;
});
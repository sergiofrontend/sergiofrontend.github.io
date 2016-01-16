app.controller('skillsCtrl', function($scope){

	$scope.titleHard = "Hard Skills";
	$scope.titleSoft = "Soft Skills";
	$scope.src = "img/skills/boy.png";
	$scope.skillshard = [
				{name: "CSS3"},
				{name: "jQuery"},
				{name: "HTML5"},
				{name: "Bootstrap"},
				{name: "JavaScript"},
				{name: "Sass & Less"},
				{name: "Adobe Illustrator"},
				{name: "Adobe Photoshop"},
				{name: "Adobe After Effects"}
			];
	$scope.skillssoft = [
				{name: "Wordpress"},
				{name: "Angularjs"},
				{name: "3Ds Max"},
				{name: "Bower"},
				{name: "PHP"},
				{name: "Git"}
			];
});
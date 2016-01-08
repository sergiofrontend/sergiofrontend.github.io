var app = angular.module('sergioPortfolioApp', ['ui.bootstrap', 'bootstrapLightbox'])
.directive('myPostRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      // iteration is complete, do whatever post-processing
      // is necessary
      element.parent().css('border', '1px solid black');
    }
  };
});





app.controller('aboutCtrl', function($scope) {
  
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
});

app.controller('skillsCtrl', function($scope){

	$scope.titleHard = "Hard Skills";
	$scope.titleSoft = "Soft Skills";
	$scope.src = "img/skills/boy.png";
	$scope.skillshard = [
				{name: "HTML5"},
				{name: "CSS3"},
				{name: "JavaScript"},
				{name: "jQuery"},
				{name: "Bootstrap"},
				{name: "Sass & Less"},
				{name: "Adobe Photoshop"},
				{name: "Adobe Illustrator"},
				{name: "Adobe After Effects"}
			];
	$scope.skillssoft = [
				{name: "PHP"},
				{name: "Angularjs"},
				{name: "Wordpress"},
				{name: "Git"},
				{name: "3Ds Max"}
			];
});


app.controller('portfoilioCtrl', function($scope, $timeout, Lightbox){

	$scope.works = [
		{
			title: "Ferdimar",
			foto: "url(img/portfolio/ferdimar/b1.jpg)",
			descricao: "this is a beautiful and functional website.",
			readmore: "A ferdimar é uma empresa multinacional, lider no mercado da construção de ferramentas diamantadas para o corte de marmore. ",
			link: "ferdimar",
			images: [
				{
			      'url': 'img/portfolio/ferdimar/g1.jpg',
			      'thumbUrl': 'img/portfolio/ferdimar/thumb/g1.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/ferdimar/g2.jpg',
			      'thumbUrl': 'img/portfolio/ferdimar/thumb/g2.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/ferdimar/g3.jpg',
			      'thumbUrl': 'img/portfolio/ferdimar/thumb/g3.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/ferdimar/g4.jpg',
			      'thumbUrl': 'img/portfolio/ferdimar/thumb/g4.jpg' // used only for this example
			    }
			]
		},
		{
			title: "Minorsa",
			foto: "url(img/portfolio/minorsa/b1.jpg)",
			descricao: "this is a beautiful and functional website.",
			readmore: "views/desc.html",
			link: "minorsa",
			images: [
				{
			      'url': 'img/portfolio/minorsa/g1.jpg',
			      'thumbUrl': 'img/portfolio/minorsa/thumb/g1.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/minorsa/g2.jpg',
			      'thumbUrl': 'img/portfolio/minorsa/thumb/g2.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/minorsa/g3.jpg',
			      'thumbUrl': 'img/portfolio/minorsa/thumb/g3.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/minorsa/g4.jpg',
			      'thumbUrl': 'img/portfolio/minorsa/thumb/g4.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/minorsa/g5.jpg',
			      'thumbUrl': 'img/portfolio/minorsa/thumb/g5.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/minorsa/g6.jpg',
			      'thumbUrl': 'img/portfolio/minorsa/thumb/g6.jpg' // used only for this example
			    }
			]
		},
		{
			title: "Di-Stone",
			foto: "url(img/portfolio/di-stone/b1.jpg)",
			descricao: "this is a beautiful and functional website.",
			readmore: "views/desc.html",
			link: "di-stone",
			images: [
				{
			      'url': 'img/portfolio/di-stone/g1.jpg',
			      'thumbUrl': 'img/portfolio/di-stone/thumb/g1.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/di-stone/g2.jpg',
			      'thumbUrl': 'img/portfolio/di-stone/thumb/g2.jpg' // used only for this example
			    },
			    {
			      'url': 'img/portfolio/di-stone/g3.jpg',
			      'thumbUrl': 'img/portfolio/di-stone/thumb/g3.jpg' // used only for this example
			    }
			]
		},
		{
			title: "Motion Graphics",
			foto: "url(img/portfolio/motion_graphics/b1.jpg)",
			descricao: "Video de apresentação de Soraia Malaquias.",
			readmore: "A Soraia Malaquias é uma Designer e 3D animator",
			link: "motion_graphics",
			images: [
				{
			      'type': 'video',
			      'url': 'img/portfolio/motion_graphics/after.mp4',
			      'thumbUrl': 'img/portfolio/motion_graphics/thumb/g1.jpg'
			    }
			]
		}
	];


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
});




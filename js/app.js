var app = angular.module('sergioPortfolioApp', ['ui.bootstrap', 'bootstrapLightbox', 'ngAnimate', 'angular-scroll-animate', 'ngRoute']);

app.config(function($locationProvider) {
  $locationProvider.html5Mode({ enabled: true, requireBase: true });	
});

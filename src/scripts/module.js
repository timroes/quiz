angular.module("devquiz", ['ngAnimate', 'ngRoute', 'ngDialog', 'templates', 'LocalStorageModule'])
.config(function($routeProvider) {
	$routeProvider
		.when('/quiz/:id', {
			controller: 'quizController',
			templateUrl: 'quiz.html'
		})
		.otherwise({
			controller: 'homeController',
			templateUrl: 'home.html'
		});
})
.config(function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('devquiz');
});
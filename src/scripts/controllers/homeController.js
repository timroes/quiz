angular.module('devquiz')
.controller('homeController', function($scope, $location, $http, gameService) {

	// If there was an active game, that hasn't been finished yet,
	// jump back to it.
	if(gameService.isGameActive()) {
		$location.path('/quiz/' + gameService.getActiveGameId());
	}

	$http.get('/quizzes/list.json').then(function(response) {
		$scope.quizzes = response.data;
	});

});

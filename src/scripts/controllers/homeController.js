angular.module('devquiz')
.controller('homeController', function($scope, $location, $http, gameService) {

	// If there was an active game, that hasn't been finished yet,
	// jump back to it.
	if(gameService.isGameActive()) {
		$location.path('/quiz/' + gameService.getActiveGameId());
	}

	$http.get('/quizes/list.json').then(function(response) {
		$scope.quizes = response.data;
	});

});
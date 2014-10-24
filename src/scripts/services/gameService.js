angular.module('devquiz')
.factory('gameService', function($rootScope, localStorageService) {

	var LS_KEY_GAME_ID = 'activeGameId';


	function isGameActive() {
		return !!localStorageService.get(LS_KEY_GAME_ID);
	}

	function getActiveGameId() {
		return localStorageService.get(LS_KEY_GAME_ID);
	}

	function startGame(id) {
		localStorageService.set(LS_KEY_GAME_ID, id);
	}

	return {
		getActiveGameId: getActiveGameId,
		isGameActive: isGameActive,
		startGame: startGame
	};

});
angular.module("devquiz")
.controller("teamSettingsController", function($scope, teamService) {
	$scope.deleteTeam = function(team) {
		teamService.deleteTeam(team);
		$scope.closeThisDialog();
	};
});
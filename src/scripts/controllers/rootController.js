angular.module('devquiz')
.controller('rootController', function($scope, configService) {

	$scope.showConfig = configService.showConfigDialog;

});
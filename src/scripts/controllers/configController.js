angular.module('devquiz')
.controller('configController', function($scope, configService) {

	// Load config from locaStorage on start.
	$scope.config = configService.get();

	// Whenever config changes save it again.
	$scope.$watch('config', function(conf) {
		configService.save(conf);
	}, true);

});
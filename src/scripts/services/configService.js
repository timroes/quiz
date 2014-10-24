angular.module('devquiz')
.factory('configService', function(ngDialog, localStorageService) {

	var LS_KEY_CONFIG = 'config';

	var config = localStorageService.get(LS_KEY_CONFIG) || { keys: {} };

	function showConfigDialog() {
		ngDialog.open({
			template: 'dialogs/config.html',
			controller: 'configController'
		});
	}

	function get() {
		return config;
	}

	function save() {
		localStorageService.set(LS_KEY_CONFIG, config);
	}

	return {
		'get': get,
		'save': save,
		'showConfigDialog': showConfigDialog
	};

});
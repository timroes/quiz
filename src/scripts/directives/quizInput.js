angular.module("devquiz")
.directive("quizInput", function($document) {
	return {
		restrict: 'E',
		scope: {
			'callback': '&'
		},
		link: function(scope) {
			var openDialogs = 0;

			scope.$on('ngDialog.opened', function() {
				openDialogs++;
			});

			scope.$on('ngDialog.closed', function() {
				openDialogs--;
			});

			$document.bind('keypress', function(ev) {
				if (openDialogs === 0) {
					scope.$apply(function() {
						scope.callback({
							'$event': ev
						});
					});
				}
			});
		}
	};
});
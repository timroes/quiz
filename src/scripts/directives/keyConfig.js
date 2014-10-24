angular.module('devquiz')
.directive('keyConfig', function() {

	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			'ngModel': '=',
			'label': '@'
		},
		template: '<button class="keyconfig" type="button" ng-keypress="keypress($event)" ng-focus="setFocus(true)" ng-blur="setFocus(false)">' +
			'<span ng-show="!focus">{{ label }} <span ng-show="ngModel">(#{{ngModel}})</span></span>' +
			'<span ng-show="focus">-- Press key --</span>' +
			'</button>',
		replace: true,
		link: function(scope, element) {

			scope.setFocus = function(hasFocus) {
				scope.focus = hasFocus;
			};

			scope.keypress = function(ev) {
				scope.ngModel = ev.keyCode;
				ev.preventDefault();
				ev.stopPropagation();
				element.blur();
			};
		}
	};

});
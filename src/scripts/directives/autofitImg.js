angular.module('devquiz')
.directive('autofitImg', function() {

	return {
		'restrict': 'E',
		'required': 'src',
		'scope': {
			'src': '='
		},
		'link': function(scope, elem, attrs) {
			scope.$watch('src', function(imgsrc) {
				if(imgsrc) {
					elem.css('background-image', 'url("' + imgsrc + '")');
				}
			});
			elem.css({
				'background-size': 'contain',
				'background-position': 'center',
				'background-repeat': 'no-repeat'
			});
		}
	};

});
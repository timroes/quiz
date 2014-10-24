angular.module("devquiz")
.directive("quizTeambox", function($timeout, $animate, ngDialog) {
	var cssClassCorrect = 'teambox--correct';
	var cssClassWrong = 'teambox--wrong';

	function flashClass(element, cssClass) {
		$animate.addClass(element, cssClass, function() {
			$animate.removeClass(element, cssClass);
		});
	}

	return {
		restrict: 'E',
		scope: {
			'team': '=',
			'guessing': '='
		},
		templateUrl: 'directives/teambox.html',
		replace: true,
		link: function(scope, element) {

			var blockedFrom, blockedTill;

			function calculateBlockedBar() {
				var timeLeft = blockedTill - Date.now();
				var percentage = timeLeft / (blockedTill - blockedFrom);
				element.find('.blockedtimer').css('width', Math.round(percentage * 100) + '%');
				if(scope.team.blocked && timeLeft > 0) {
					$timeout(calculateBlockedBar, 16);
				}
			}

			scope.$watch('team.blockedTill', function(until) {
				if(!scope.team.blocked) return;

				blockedTill = until;
				blockedFrom = Date.now();

				$timeout(calculateBlockedBar, 16);

			});

			scope.$watch('team.points', function(current, previous) {
				if (current > previous) {
					flashClass(element, cssClassCorrect);
				}
			});

			scope.$watch('team.blocked', function(isBlocked, wasBlocked) {
				if (isBlocked && !wasBlocked) {
					flashClass(element, cssClassWrong);
				}
			});

			scope.showTeamSettings = function() {
				ngDialog.open({
					template: 'dialogs/teamSettings.html',
					controller: 'teamSettingsController',
					scope: scope
				});
			};
		}
	};
});
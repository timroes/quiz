angular.module("devquiz")
.controller("quizController", function($scope, $routeParams, $http, gameService, configService, teamService) {

	// Retrieve the quiz id and store it into local storage
	var quizId = $routeParams.id;

	var config = configService.get();

	$scope.teams = teamService.get();

	$scope.addTeam = teamService.addTeam;

	function startQuiz() {
		$scope.questionIndex = -1;
		$scope.phase = 'title';
	}

	function onNext() {
		if ($scope.phase === 'title' || $scope.phase === 'solution' ||
				($scope.phase === 'question' && $scope.question.type === 'interlude')) {
			nextQuestion();
		} else if ($scope.phase === 'question') {
			$scope.phase = 'solution';
		}
	}

	function onRight() {
		if ($scope.phase === 'guessing') {
			$scope.phase = 'solution';
			$scope.guessingTeam.points += $scope.question.points;
			$scope.guessingTeam = undefined;
		}
	}

	function onWrong() {
		if ($scope.phase === 'guessing') {
			$scope.phase = 'question';
			teamService.blockTeam($scope.guessingTeam);
			$scope.guessingTeam = undefined;
		}
	}

	function onTeamKey(team) {
		if ($scope.phase === 'question' && $scope.question.type !== 'interlude' && !team.blocked) {
			$scope.phase = 'guessing';
			$scope.guessingTeam = team;
		}
	}

	function nextQuestion() {
		if ($scope.questionIndex + 1 >= $scope.quiz.items.length) {
			$scope.phase = 'end';
		} else {
			$scope.questionIndex++;
			$scope.question = $scope.quiz.items[$scope.questionIndex];
			$scope.phase = 'question';
		}
	}

	$http.get('quizzes/' + quizId + '/quiz.json')
	.then(function(response) {
		$scope.quiz = response.data;
		startQuiz();
	});

	$scope.$watch('question', function(question) {
		if(question && question.image) {
			$scope.questionImg = '/quizzes/' + quizId + '/' + question.image;
			$scope.solution = question.solution;
		} else {
			$scope.questionImg = '';
			$scope.solution = '';
		}
	});

	$scope.$watch('phase', function(phase) {
		if(phase === 'end') {
			// Find the maximum points of all team and set these as the winningPoints
			$scope.winningPoints = $scope.teams.reduce(function(prev, cur) {
				return Math.max(prev, cur.points);
			}, 0);
		} else if(phase === 'solution') {
			teamService.unblockAll();
		}
	});

	$scope.onKeyPress = function(ev) {
		if (ev.keyCode === config.key.next || ev.which === config.keys.next) {
			onNext();
		} else if (ev.keyCode === config.keys.correct || ev.which === config.keys.correct) {
			onRight();
		} else if (ev.keyCode === config.keys.wrong || ev.which === config.keys.wrong) {
			onWrong();
		} else if (ev.keyCode === config.keys.finish || ev.which === config.keys.finish) {
			$scope.phase = 'end';
		} else {
			var team = teamService.getTeamByKey(ev.keyCode || ev.which);
			if (team) {
				onTeamKey(team);
			}
		}
	};
});

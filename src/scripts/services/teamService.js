angular.module('devquiz')
.factory('teamService', function($timeout) {

	var RANDOM_NAMES = [
		'(¬‿¬)',
		'(∩▂∩)',
		'(-’_\'-)',
		'(*_*)',
		'(¬_¬)'
	];

	var teams = [];

	function addTeam() {
		teams.push({
			"name": RANDOM_NAMES[Math.floor(Math.random()*RANDOM_NAMES.length)],
			"points": 0,
			"key": 0
		});
	}

	function deleteTeam(team) {
		teams.splice(teams.indexOf(team), 1);
	}

	function get() {
		return teams;
	}

	function getTeamByKey(key) {
		for (var i in teams) {
			if (teams[i].key === key) {
				return teams[i];
			}
		}
	}

	function blockTeam(team) {
		team.blocked = true;
		team.blockedTill = Date.now() + 5000;
		$timeout(function() {
			team.blocked = false;
		}, 5000);
	}

	function unblockAll() {
		for (var i in teams) {
			teams[i].blocked = false;
			teams[i].blockedTill = 0;
		}
	}

	return {
		'addTeam': addTeam,
		'blockTeam': blockTeam,
		'deleteTeam': deleteTeam,
		'get': get,
		'getTeamByKey': getTeamByKey,
		'unblockAll': unblockAll
	};
});
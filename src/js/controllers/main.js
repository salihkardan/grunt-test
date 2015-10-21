'use strict';

angular.module('myApp')
.controller('MainCtrl', function ($scope) {
	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma',
	];
})

.controller('TestCtrl', function ($scope) {
	$scope.awesomeThings1 = [
		'HTML5 Boilerplate1',
		'AngularJS1',
		'Karma1',
	];
});



var app = angular.module("root-app", ['ui.router', 'child-app']);
app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state("state1", {
		url: "/state1",
		templateUrl: "partials/state1.html"
	})
	.state("state2", {
		url: "/state2",
		templateUrl: "partials/state2.html"
	});
});

app.run(function ($rootScope) {
	$rootScope.$on("$stateNotFound", function () {
		console.log("base app Route not found: " + arguments);
	});
	$rootScope.$on("$stateChangeStart", function () {
		console.log("base app Route change start: " + arguments);
	});
});
(function() {
    var baseUrl = {
        "child-app": "/cdd"
    }
    var app = angular.module("child-app", ["ui.router"]);
    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        	.state("childapp", {
        		url: "/childapp",
				templateUrl: "partials/child-app.html"
        	})
            .state("childapp.state1", {
                url: "/childapp/state1",
                templateUrl: "partials/child-state1.html"
            })
            .state("childapp.state2", {
                url: "/childapp/state2",
                templateUrl: "partials/child-state2.html"
            });
    });
    app.run(function ($rootScope) {
        $rootScope.$on("$stateNotFound", function () {
            console.log("child app Route not found: " + arguments);
        });
        $rootScope.$on("$stateChangeStart", function () {
            console.log("child app Route change start: " + arguments);
        });
    });
})();
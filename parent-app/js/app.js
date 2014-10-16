var app = angular.module("root-app", ['ui.router', 'cdd-app']);
window.subAppMetadata = {
    "cdd-app": {
        baseUrl: "/cdd/",
        baseStateName: "cdd",
        baseTemplateUrl: "child-app/"
    }
};
require.config({
    baseUrl: "child-app/js"
});
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("deals", {
            url: "/state1",
            templateUrl: "partials/state1.html"
        })
        .state("home", {
            url: "/state2",
            templateUrl: "partials/state2.html"
        })
        .state(window.subAppMetadata["cdd-app"].baseStateName, {
            url: window.subAppMetadata["cdd-app"].baseUrl,
            templateUrl: "child-app/partials/child-app.html"
        });
});
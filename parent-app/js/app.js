var app = angular.module("root-app", ['ui.router', "oc.lazyLoad"]);
window.subAppMetadata = {
    "cdd-app": {
        baseUrl: "/cdd/",
        baseStateName: "cdd",
        baseTemplateUrl: "child-app"
    }
};
require.config({
    baseUrl: "child-app/js"
});
app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        loadedModules: ["root-app"],
        modules: [{
            name: 'cdd-app',
            files: ['child-app/js/main.js']
        }],
        asyncLoader: require
    });
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
            templateUrl: "child-app/partials/child-app.html",

            controller: function($ocLazyLoad) {
                var promise = $ocLazyLoad.load("cdd-app");
                promise.then(function() {
                    console.log(arguments);
                }, function() {
                    console.log(arguments);
                })
            },

            resolve: {
                loadModule: function ($ocLazyLoad) {
                    return $ocLazyLoad.load("cdd-app");
                }
            }
        });
});

app.run (function ($rootScope) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        console.log("routeChangeStart");
    });
    $rootScope.$on("$stateNotFound", function(event, toState, toParams, fromState, fromParams) {
        console.log("stateNotFound");
    });
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        console.log("stateChangeSuccess");
    });
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams) {
        console.log("stateChangeError");
    });
    $rootScope.$on("$viewContentLoading", function(event, toState, toParams, fromState, fromParams) {
        console.log("viewContentLoading");
    });
    $rootScope.$on("$viewContentLoaded", function(event, toState, toParams, fromState, fromParams) {
        console.log("viewContentLoaded");
    });
});
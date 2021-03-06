define([], function() {
    var cddModuleName = "cdd-app";
    var app = angular.module("cdd-app", ["ui.router"]);
    var createStateName = function(stateName) {
        if (!window.subAppMetadata) {
            return stateName;
        }
        var cddAppMetadata = window.subAppMetadata[cddModuleName];
        var stateNameFormat = "{0}.{1}";
        return String.format("{0}.{1}", cddAppMetadata.baseStateName, stateName);
    };
    var createTemplateUrl = function(templateUrl) {
        if (!window.subAppMetadata) {
            return templateUrl
        };
        var cddAppMetadata = window.subAppMetadata[cddModuleName];
        return String.format("{0}/{1}", cddAppMetadata.baseTemplateUrl, templateUrl);
    }
    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state(createStateName("client360"), {
                url: "client360",
                templateUrl: createTemplateUrl("partials/child-state1.html"),
                controller: 'Client360Controller'
            })
            .state(createStateName("inbox"), {
                url: "inbox",
                templateUrl: createTemplateUrl("partials/child-state2.html"),
                controller: 'InboxController'
            });
    });
    return app;
});
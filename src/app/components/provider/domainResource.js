(function () {
    'use strict';
    angular.module('app')
        .factory('DomainResource', ["$resource", "Configuration", function ($resource, Configuration) {
            return $resource(Configuration.API + "/:controller/:action/:id", {"id": "@id"},
                {
                    "update": {method: "PUT"},
                    "list": {method: "GET", params: {action: 'list'}, isArray: false},
                    "save": { method: "POST", params: {action: 'save'}}
                });
        }
        ]);
})();
(function () {
    'use strict';
    angular.module('app')
        .factory('DomainResource', ["$resource", "Configuration", function ($resource, Configuration) {
            return $resource(Configuration.API + "/:controller/:action/:id", {"id": "@id"}, {});
        }
        ]);
})();
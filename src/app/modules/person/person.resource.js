(function () {
    'use strict';
    angular.module('app')
        .factory('Person', ["DomainServiceFactory", function (DomainServiceFactory) {
            return DomainServiceFactory("/person/:action/:id", {"id": "@id"});
        }
        ]);
})();
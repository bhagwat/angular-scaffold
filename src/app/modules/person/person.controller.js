(function () {
    angular.module('app')
        .controller('PersonCtrl', ["DomainResource", "$http", function (DomainResource, $http) {
            var self = this;
            self.pageSize = 5;
            self.options = {};
            self.dateOptions = {
                dateDisabled: false,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            self.init = function () {
                DomainResource.list(
                    angular.extend({controller: 'person'}, self.options, {max: self.pageSize}),
                    function (response) {
                        self.persons = response.instances;
                        self.total = response.total;
                    }, angular.noop);
            };
            self.createPerson = function () {
                DomainResource.save({controller: 'person'}, {person: self.person},
                    function (response) {
                    }, angular.noop
                );
            };
            self.sortChanged = function (sort, order) {
                self.options = {sort: sort, order: order};
                self.init()
            };

            self.pageChanged = function () {
                self.options.offset = (self.options.currentPage - 1) * self.pageSize;
                self.init()
            };
        }]);
})();

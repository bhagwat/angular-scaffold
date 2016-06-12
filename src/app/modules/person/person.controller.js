(function () {
    angular.module('app')
        .controller('PersonCtrl', ["DomainResource", function (DomainResource) {
            var self = this;

            self.pageSize = 5;
            self.options = {};

            self.init = function () {
                DomainResource.list(
                    angular.extend({controller: 'person'}, self.options, {max: self.pageSize}),
                    function (response) {
                        self.persons = response.instances;
                        self.total = response.total;
                    }, angular.noop);
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

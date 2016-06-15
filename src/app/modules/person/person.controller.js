(function () {
    angular.module('app')
        .controller('PersonCtrl', ["DomainResource", "$timeout", "$state", "$stateParams", "toastr", "$uibModal", function (DomainResource, $timeout, $state, $stateParams, toastr, $uibModal) {
            var self = this;
            self.pageSize = 5;
            self.options = {};

            if ($stateParams.person) {
                DomainResource.find({controller: 'person', id: $stateParams.person.id},
                    function (response) {
                        self.person = response;
                        self.person.married = self.person.married.toString();
                        self.person.joiningDate = new Date(self.person.joiningDate);
                    }, function (error) {
                        console.log(error);
                    }
                );
            }
            self.dateOptions = {
                dateDisabled: false,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            self.fillPersonDetails = function (person) {

                $state.go('home.person.edit', {person: person});
            };
            self.delete = function (person) {
                self.person = person;
                if (confirm("Are you Sure Want to Delete the Record")) {
                    DomainResource.delete({controller: 'person', id: person.id},
                        function (response) {
                            self.init();
                        }, function (error) {
                            console.log("error");
                        }
                    );
                }
            };
            self.init = function () {
                DomainResource.list(
                    angular.extend({controller: 'person'}, self.options, {max: self.pageSize}),
                    function (response) {
                        self.persons = response.instances;
                        self.total = response.total;
                    }, angular.noop);
            };

            self.savePerson = function () {
                DomainResource.save({controller: 'person'}, {person: self.person},
                    function (response) {
                        self.person = {};
                        toastr.success("", 'Person saved successfully.', {closeButton: true});
                        self.groupedErrors = {};
                    }, function (error) {
                        self.allErrorFields = _.map(error.data.errors, "field");
                        self.groupedErrors = _.groupBy(error.data.errors, "field");
                    }
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

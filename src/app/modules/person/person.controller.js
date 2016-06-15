(function () {
    angular.module('app')
        .controller('PersonCtrl', ["DomainResource", "$timeout", "$state", "$stateParams", "toastr",
            function (DomainResource, $timeout, $state, $stateParams, toastr) {
                var self = this;
                self.pageSize = 5;
                self.options = {};

                self.load = function () {
                    self.pageTitle = $state.current.title;
                    self.errorData = null;
                    DomainResource.get({
                        controller: 'person',
                        action: $stateParams.id ? 'edit' : 'create',
                        id: $stateParams.id
                    }, function (response) {
                        self.person = response;
                    });
                };

                self.list = function () {
                    DomainResource.get(
                        angular.extend({
                            controller: 'person',
                            action: 'list'
                        }, self.options, {max: self.pageSize}),
                        function (response) {
                            self.persons = response.instances;
                            self.total = response.total;
                        }, angular.noop);
                };

                self.delete = function (person) {
                    if (confirm("Are you sure you want to delete this?")) {
                        DomainResource.delete({
                                controller: 'person',
                                action: 'delete',
                                id: person.id
                            },
                            function () {
                                $state.go('home.person.list');
                                toastr.success("", 'Person deleted successfully.', {closeButton: true});
                            }, function (error) {
                                toastr.error("", 'Failed to delete. Please try  again.', {closeButton: true});
                            }
                        );
                    }
                };

                self.savePerson = function () {
                    DomainResource.save({
                            controller: 'person',
                            action: 'save'
                        }, {person: self.person},
                        function (person) {
                            self.errorData = null;
                            toastr.success("", "Person " + ($stateParams.id ? 'updated' : 'saved') + " successfully.", {closeButton: true});
                            $state.go('home.person.edit', {id: person.id});
                        }, function (response) {
                            self.errorData = response.data;
                            toastr.error("", "Invalid data entered. Failed to save.", {closeButton: true});
                        }
                    );
                };

                self.sortChanged = function (sort, order) {
                    self.options = {sort: sort, order: order};
                    self.list()
                };

                self.pageChanged = function () {
                    self.options.offset = (self.options.currentPage - 1) * self.pageSize;
                    self.list()
                };
            }]);
})();

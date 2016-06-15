(function () {
    angular.module('app')
        .controller('PersonFormCtrl',
            ["Person", "$state", "$stateParams", "toastr",
                function (Person, $state, $stateParams, toastr) {
                    var self = this;

                    self.load = function () {
                        self.errorData = null;
                        self.person = $stateParams.id ? Person.edit({id: $stateParams.id}) : Person.create();
                    };

                    self.savePerson = function () {
                        Person.save({person: self.person},
                            function (person) {
                                self.errorData = null;
                                toastr.success("Person " + ($stateParams.id ? 'updated' : 'saved') + " successfully.", "Update");
                                $state.go('^.edit', {id: person.id});
                            }, function (response) {
                                self.errorData = response.data;
                                toastr.error("Invalid data entered. Failed to save.", "Update");
                            }
                        );
                    };

                    self.delete = function () {
                        if (confirm("Are you sure you want to delete?")) {
                            Person.delete(self.person,
                                function () {
                                    $state.go('^.list');
                                    toastr.success('Person deleted successfully.', "Delete");
                                }, function (error) {
                                    toastr.error('Failed to delete. Please try  again.', "Delete");
                                }
                            );
                        }
                    };

                }]);
})();

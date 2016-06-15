'use strict';

angular.module('app')
    .directive('deleteModel', ["DomainResource", "$uibModal", function (DomainResource, $uibModal) {
        return {
            restrict: 'EA',
            controllerAs: 'cp',
            replace: true,
            bindToController: true,
            controller: function () {
                var cp = this;
                cp.animationsEnabled = true;
                cp.ngModel = function (person) {
                    cp.person = person;
                    console.log(person, 8888);
                }
                cp.ngOpen = function () {
                    var modalInstance = $uibModal.open({
                        animation: cp.animationsEnabled,
                        templateUrl: 'app/components/directives/views/deleteModel.html'
                    });
                    modalInstance.result.then(function (selectedItem) {
                        //cp.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
                cp.toggleAnimation = function () {
                    cp.animationsEnabled = !cp.animationsEnabled;
                };
            },
            scope: {
                ngModel: "=",
                ngOpen: "="
            },


        };
    }]);

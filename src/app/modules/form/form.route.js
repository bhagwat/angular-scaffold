'use strict';

angular.module('app')
    .config(['navServiceProvider', function (navServiceProvider) {
        navServiceProvider.addMenu(
            new MenuItem(10)
                .setState('home.form', {
                    abstract: true,
                    url: '/form',
                    template: '<ui-view/>',
                    title: "Forms",
                    icon: 'edit'
                })
                .add(new MenuItem(10)
                    .setState('home.form.general', {
                        url: '/general',
                        templateUrl: 'app/modules/form/views/form.general.html',
                        title: "General Form",
                        icon: 'edit'
                    }))
                .add(new MenuItem(20)
                    .setState('home.form.advanced', {
                        url: '/advanced',
                        templateUrl: 'app/modules/form/views/form.advanced.html',
                        title: "Advanced Components",
                        icon: 'edit'
                    }))
                .add(new MenuItem(30)
                    .setState('home.form.button', {
                        url: '/button',
                        templateUrl: 'app/modules/form/views/form.button.html',
                        title: "Form Buttons",
                        icon: 'edit'
                    }))
        );
    }]);

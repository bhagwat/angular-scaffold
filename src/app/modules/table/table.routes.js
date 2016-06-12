'use strict';

angular.module('app')
    .config(["navServiceProvider", function (navServiceProvider) {
        var base = "app/modules/table/views/";

        navServiceProvider.addMenu(
            new MenuItem(20)
                .setState('home.table', {
                    abstract: true,
                    url: '/table',
                    template: '<ui-view/>',
                    title: "Tables",
                    icon: 'table'
                })
                .add(new MenuItem(10)
                    .setState('home.table.simple', {
                        url: '/simple',
                        templateUrl: base + 'table.simple.html',
                        title: "Tables"
                    }))
                .add(new MenuItem(20)
                    .setState('home.table.dynamic', {
                        url: '/dynamic',
                        templateUrl: base + 'table.dynamic.html',
                        title: "Table Dynamic"
                    }))
        );
    }]);

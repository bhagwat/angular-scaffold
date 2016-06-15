'use strict';

angular.module('app')
    .config(["navServiceProvider", function (navServiceProvider) {
        var base = "app/modules/person/views/";

        navServiceProvider.addMenu(
            new MenuItem(5)
                .setState('home.person', {
                    abstract: true,
                    url: '/person',
                    template: '<ui-view/>',
                    title: "Person",
                    icon: 'table'
                })
                .add(new MenuItem(10)
                    .setState('home.person.list', {
                        url: '/list',
                        templateUrl: base + 'person.list.html',
                        title: "List"
                    }))
                .add(new MenuItem(20)
                    .setState('home.person.create', {
                        url: '/create',
                        templateUrl: base + 'person.create.html',
                        title: "New Person"
                    }))
                .add(new MenuItem(20)
                    .setState('home.person.edit', {
                        url: '/edit',
                        templateUrl: base + 'person.edit.html',
                        title: "Edit Person",
                        params: {person: null}
                    }))
        );
    }]);

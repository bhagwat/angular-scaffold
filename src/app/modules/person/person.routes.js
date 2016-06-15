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
                        templateUrl: base + 'person.form.html',
                        title: "New Person"
                    }))
                .add(new MenuItem(20)
                    .setState('home.person.edit', {
                        url: '/edit/:id',
                        templateUrl: base + 'person.form.html',
                        title: "Edit Person",
                        hidden: true
                    }))
        );
    }]);

var MenuItem = function (index) {
    var _self = this;

    _self.index = index;
    _self.parent = null;
    _self.state = "";
    _self.icon = "";
    _self.title = "";
    _self.items = [];

    _self.add = function (item) {
        item.parent = _self;
        _self.items.push(item);
        return _self;
    };

    _self.setState = function (state, config) {
        _self.state = state;
        _self.icon = config.icon || '';
        _self.title = config.title || state;
        _self.config = config;
        return _self;
    };

    return _self;
};

(function () {
    'use strict';
    angular.module('app', ['ngResource', 'ui.bootstrap', 'ui.router'])
        .config(["$urlRouterProvider", "$stateProvider", "navServiceProvider", function ($urlRouterProvider, $stateProvider, navServiceProvider) {

            navServiceProvider.setStateProvider($stateProvider);

            navServiceProvider.setRoot(
                new MenuItem(10)
                    .setState('home', {
                        url: '',
                        templateUrl: 'app/views/main.html',
                        title: "General",
                        icon: 'home'
                    })
            );

            $urlRouterProvider.otherwise('/person/list');
        }])
        .service("Configuration", [function () {
            if (/localhost:3000/.test(window.location.host)) {
                return this.API = 'http://localhost:8080';
            } else {
                return this.API = '';
            }
        }]);
})();
'use strict';

var tlMovies = angular.module('tlMovies', ['ui.router', 'nvd3', 'ngStorage', 'ui.bootstrap']);

tlMovies.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('site-root', {
            url: '/',
            templateUrl: 'topList/topList.html',
            controller: 'TopListCtrl as topListCtrl'
        })
        .state('top-list', {
            url: '/top-list',
            templateUrl: 'topList/topList.html',
            controller: 'TopListCtrl as topListCtrl'
        })
        .state('favorite', {
            url: '/favorite',
            templateUrl: 'favorite/favorite.html',
            controller: 'FavoriteCtrl as favoriteCtrl'
        })
        .state('decades', {
            url: '/decades',
            templateUrl: 'decades/decades.html',
            controller: 'DecadeCtrl'
        });

    $urlRouterProvider.otherwise('/');
}]);


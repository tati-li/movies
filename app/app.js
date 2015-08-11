'use strict';

var tlMovies = angular.module('tlMovies', ['ui.router', 'nvd3', 'ngStorage', 'ui.bootstrap']);

tlMovies.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
/*    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });*/
    // Now set up the states
    $stateProvider
        .state('top-list', {
            url: '/top-list',
            templateUrl: 'topList/topList.html',
            controller: 'TopMoviesCtrl as topMoviesCtrl'
        })
        .state('favorite', {
            url: '/favorite',
            templateUrl: 'favorite/favorite.html',
            controller: 'FavoriteCtrl as favoriteCtrl'
        })
        .state('site-root', {
            url: '/',
            templateUrl: 'topList/topList.html',
            controller: 'TopMoviesCtrl as topMoviesCtrl'
        })
        .state('decades', {
            url: '/decades',
            templateUrl: 'decades/decades.html',
            controller: 'DecadeCtrl'
        });

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');



}]);


'use strict';

var tlMovies = angular.module('tlMovies', ['ui.router']);

tlMovies.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // Now set up the states
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        })
        .state('articles-paged', {
            url: '/articles/:page?',
            templateUrl: 'articles/articles.html',
            controller: 'ArticlesCtrl'
        })
        .state('site-root', {
            url: '/',
            templateUrl: 'articles/articles.html',
            controller: 'ArticlesCtrl'
        })
        .state('create-article-page', {
            url: '/article/create',
            templateUrl: 'create/create.html',
            controller: 'NewArticleCtrl'
        })
        .state('single-article-page', {
            url: '/article/:id',
            templateUrl: 'article/article.html',
            controller: 'ArticleCtrl'
        });

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/login');

}]);


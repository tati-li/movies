'use strict';

tlMovies.controller('TopListCtrl', ['$scope', 'Movies', function($scope, Movies){
  Movies.getTop().then(
    function(movies){
      $scope.movies = movies;
    }
  );

  $scope.getDirectors = function (directors) {
    var names = [];

    directors.forEach(function (director) {
      names.push(director.name);
    });

    return names.join(', ');
  };
  $scope.getTrailer = function (directors) {
    var names = [];
    console.log(directors);

/*    directors.forEach(function (director) {
      names.push(director.name);
    });*/

    return names;
  };
/*  $scope.getTrailer = function (id) {
    console.log('tt0111161',id);
*//*    Movies.getById(id).then(
      function(movie){
        return  movie;
      }
    );*//*
  };*/

/*  $scope.getTrailer = Movies.getById('tt0111161').then(
    function(movie){
      $scope.mov = movie;
    }
  );*/




}]);
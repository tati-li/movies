'use strict';

tlMovies.controller('TopMoviesCtrl', ['$scope', 'Movies', function($scope, Movies){
  Movies.getTop().then(
    function(movies){
      $scope.movies = movies;
            movies.forEach(function (item) {
                Movies.getId(item.idIMDB).then(
                    function(movie){
                        item.trailer = movie.trailer;
                    }
                );

            });
        }
  );

  $scope.getDirectors = function (directors) {
    var names = [];

    directors.forEach(function (director) {
      names.push(director.name);
    });

    return names.join(', ');
  };


/*  $scope.getTrailer = Movies.getById('tt0111161').then(
    function(movie){
      $scope.mov = movie;
    }
  );*/




}]);
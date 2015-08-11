'use strict';

function TopMoviesCtrl ($scope, Movies, $localStorage, $modal) {

  OpenModalCtrl.apply(this, [$scope, $modal]);

  this.$localStorage = $localStorage;
  this.$scope        = $scope;
  this.Movies        = Movies;

  this.initFavorite();

  this.Movies.getTop().then(
    function (movies) {
      this.movies = movies;

      this.isReady = true;

      movies.forEach(function (item, index) {

        if (index < 2) {
          console.log(index, item);
          this.getMovieInfo(item);
        } else {
          var _timer = setTimeout(function(){
            clearInterval(_timer);
            console.log('timeout', index, item);
            this.getMovieInfo(item);

          }.bind(this),5000);

        }
      }.bind(this));

    }.bind(this)
  );
}

TopMoviesCtrl.prototype = Object.create(AbstractMovieCtrl.prototype);

TopMoviesCtrl.prototype.getMovieInfo =  function (item) {
  this.Movies.getId(item.idIMDB).then(
    function (movie) {
      item.trailer = movie.trailer;
    }
  );
}

TopMoviesCtrl.prototype.addFavorite = function (movieInfo) {
  console.log('add', movieInfo);
  this.favorite.push(movieInfo);
  this.movies.forEach(function (movie) {
    if (movie.idIMDB == movieInfo.idIMDB) {
      movie.favorite = true;
    }
  });

};

TopMoviesCtrl.prototype.removeFavorite = function (id) {

  this.favorite.forEach(function (item, index) {
    if (item.idIMDB == id) {
      this.favorite.splice(index, 1);
    }
  }.bind(this));

  this.movies.forEach(function (movie) {
    if (movie.idIMDB == id) {
      movie.favorite = false;
    }
  });

};

tlMovies.controller('TopMoviesCtrl', ['$scope', 'Movies', '$localStorage', '$modal', TopMoviesCtrl]);
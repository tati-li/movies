'use strict';

function TopListCtrl ($scope, Movies, $localStorage, $modal) {

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

        if (index < 3) {
          console.log(index, item);
          this.getMovieInfo(item);
        } else {
          setTimeout(function () {
            console.log(index, item);
            this.getMovieInfo(item);
          }.bind(this), index* 1500);
        }
      }.bind(this));

    }.bind(this)
  );
}

TopListCtrl.prototype = Object.create(AbstractMovieCtrl.prototype);

TopListCtrl.prototype.getMovieInfo =  function (item) {
  this.Movies.getById(item.idIMDB).then(
    function (movie) {
      item.trailer = movie.trailer;
    }
  );
};

TopListCtrl.prototype.addFavorite = function (movieInfo) {
  console.log('add', movieInfo);
  this.favorite.push(movieInfo);
  this.movies.forEach(function (movie) {
    if (movie.idIMDB == movieInfo.idIMDB) {
      movie.favorite = true;
    }
  });

};

TopListCtrl.prototype.removeFavorite = function (id) {

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

tlMovies.controller('TopListCtrl', ['$scope', 'Movies', '$localStorage', '$modal', TopListCtrl]);
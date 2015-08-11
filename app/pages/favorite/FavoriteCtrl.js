'use strict';

function FavoriteCtrl ($scope, $localStorage, $modal) {

  OpenModalCtrl.apply(this, [$scope, $modal]);

  this.$localStorage = $localStorage;
  this.$scope        = $scope;

  this.initFavorite();

}

FavoriteCtrl.prototype = Object.create(AbstractMovieCtrl.prototype);

FavoriteCtrl.prototype.removeFavorite = function (id) {

  this.favorite.forEach(function (item, index) {
    if (item.idIMDB == id) {
      this.favorite.splice(index, 1);
    }
  }.bind(this));

};

tlMovies.controller('FavoriteCtrl', ['$scope', '$localStorage', '$modal', FavoriteCtrl]);
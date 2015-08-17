'use strict';

function FavoriteCtrl ($scope, $localStorage, $modal) {

  /**
   * Here it is one way of controllers inheritance in AngularJS.
   * It's even better to call it "mixin" not inheritance due to the app logic, cause OpenModalCtrl is not an abstract
   * entity, but the container of specific functionality.
   */
  OpenModalCtrl.apply(this, [$scope, $modal]);

  this.$localStorage = $localStorage;
  this.$scope        = $scope;

  this.initFavorite();

}

/**
 * Here we have classical JS OOP style inheritance.
 */
FavoriteCtrl.prototype = Object.create(AbstractMovieCtrl.prototype);

FavoriteCtrl.prototype.removeFavorite = function (id) {

  this.favorite.forEach(function (item, index) {
    if (item.idIMDB == id) {
      this.favorite.splice(index, 1);
    }
  }.bind(this));

};

tlMovies.controller('FavoriteCtrl', ['$scope', '$localStorage', '$modal', FavoriteCtrl]);
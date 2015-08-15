"use strict";

function AbstractMovieCtrl () {

}

AbstractMovieCtrl.prototype.initFavorite = function () {
  this.favorite = this.$localStorage.favorite || [];

  this.$scope.$watch('favorite', function () {
    this.$localStorage.favorite = this.favorite;
  }.bind(this));

  this.$scope.$watch(function () {

  }, function () {
    this.favorite = this.$localStorage.favorite;
  }.bind(this));
};
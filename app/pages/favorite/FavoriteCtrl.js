'use strict';

tlMovies.controller('FavoriteCtrl', ['$scope', 'Movies', '$localStorage', function ($scope, Movies, $localStorage) {
  $scope.favorites = $localStorage.favorite || [];

  $scope.$watch('favorite', function () {
    $localStorage.favorite = $scope.favorites;
  });

  $scope.$watch(function () {
    //return angular.toJson($localStorage);
  }, function () {
    $scope.favorites = $localStorage.favorite;
  });

  // $scope.favorites = ( localStorage.getItem('favorite') !== null ) ? JSON.parse(localStorage.getItem('favorite')) : [];

  $scope.removeFavorite = function (id) {
    $scope.favorites.forEach(function (item, index) {

      if (item.idIMDB == id) {
        $scope.favorites.splice(index, 1);
      }

    });
    // localStorage.setItem('favorite', JSON.stringify($scope.favorites));
  };


}]);
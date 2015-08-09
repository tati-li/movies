tlMovies.controller('TrailerModalCtrl', ['$scope', '$modalInstance', '$sce', 'name', 'url', 'width', 'height', function ($scope, $modalInstance, $sce, name, url, width, height) {
  $scope.name = name;
  $scope.url = $sce.trustAsResourceUrl(url.replace('single', 'embed') + '&width=' + width);
  $scope.width = width;
  $scope.height = height;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
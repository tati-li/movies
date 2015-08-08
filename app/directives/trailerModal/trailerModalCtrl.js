tlMovies.controller('trailerModalCtrl', ['$scope', '$modalInstance', '$sce', 'url', function ($scope, $modalInstance, $sce, url) {
    $scope.videoUrl =  $sce.trustAsResourceUrl(url+'&output=embed');

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
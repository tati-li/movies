'use strict';
function OpenModalCtrl ($scope, $modal) {


  $scope.openVideo = function (videoName, videoUrl, width, height) {
    var modalInstance = $modal.open({
      templateUrl: 'topList/trailerModal/trailerModal.html',
      controller: 'TrailerModalCtrl',
      resolve: {
        name: function () {
          return videoName;
        },
        url: function () {
          return videoUrl;
        },
        width: function () {
          return width;
        },
        height: function () {
          return height;
        }
      }
    });

    modalInstance.result.then(function () {

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
}
//tlMovies.controller('OpenModalCtrl', ['$scope', '$modal', OpenModalCtrl]);


'use strict';

tlMovies.controller('TopMoviesCtrl', ['$scope', 'Movies', '$localStorage', '$modal', function ($scope, Movies, $localStorage, $modal) {
  Movies.getTop().then(
    function (movies) {
      $scope.movies = movies;

      console.log('mov', movies);
      $scope.favorite.forEach(function (item) {
        $scope.movies.forEach(function (movie) {
          if (movie.idIMDB == item.idIMDB) {
            movie.favorite = true;
          }
        });
      });
      /*      $scope.movies.forEach(function (item) {
       yearsArr.push(Math.floor(item.year / 10) * 10);
       });*/
      movies.forEach(function (item) {
        Movies.getId(item.idIMDB).then(
          function (movie) {
            item.trailer = movie.trailer;
          }
        );

      });
    }
  );



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

  //$scope.movies = Movies.getData();

  var yearsArr = [];

  /*  $scope.movies.forEach(function (item) {
   yearsArr.push(Math.floor(item.year / 10) * 10);
   });*/

  $scope.film = function () {
    var result = [];
    yearsArr.sort();
    console.log('film', yearsArr);
    nextInput:
      for (var i = 0; i < yearsArr.length; i++) {
        var year = yearsArr[i];
        for (var j = 0; j < result.length; j++) {
          if (result[j].year == year) {
            result[j].films += 1;
            continue nextInput;
          }
        }
        result.push({year: year + '-' + (year + 9), films: 1});
      }
    return result;
  }();

  $scope.favorite = $localStorage.favorite || [];

  console.log('favorite', $localStorage.favorite);

  //$scope.favorite = ( localStorage.getItem('favorite') !== null ) ? JSON.parse(localStorage.getItem('favorite')) : [];




  $scope.$watch('favorite', function () {
    $localStorage.favorite = $scope.favorite;
  });

  $scope.$watch(function () {
    //return angular.toJson($localStorage);
  }, function () {
    $scope.favorite = $localStorage.favorite;
  });


  console.log($scope.favorite);
  $scope.addFavorite = function (movieInfo) {

    $scope.favorite.push(movieInfo);
   $scope.movies.forEach(function (movie) {
      if (movie.idIMDB == movieInfo.idIMDB) {
        movie.favorite = true;
      }
    });
    // localStorage.setItem('favorite', JSON.stringify($scope.favorite));
  };

  $scope.removeFavorite = function (id) {
    $scope.favorite.forEach(function (item, index) {

      if (item.idIMDB == id) {
        $scope.favorite.splice(index, 1);
      }

    });
    // localStorage.setItem('favorite', JSON.stringify($scope.favorite));
    $scope.movies.forEach(function (movie) {
      if (movie.idIMDB == id) {
        movie.favorite = false;
      }
    });

  };




}]);
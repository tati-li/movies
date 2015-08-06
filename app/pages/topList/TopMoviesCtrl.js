'use strict';

tlMovies.controller('TopMoviesCtrl', ['$scope', 'Movies', '$localStorage', function($scope, Movies, $localStorage){
  $scope.movies = Movies.getData();

  var yearsArr = [];

  $scope.movies.forEach(function (item) {
      yearsArr.push(Math.floor(item.year / 10) * 10);
  });

  $scope.film = function (){
    var result = [];
    yearsArr.sort();
    console.log('film',yearsArr);
    nextInput:
      for (var i = 0; i < yearsArr.length; i++) {
        var year = yearsArr[i];
        for (var j = 0; j < result.length; j++) {
          if (result[j].year == year) {
            result[j].films += 1;
            continue nextInput;
          }
        }
        result.push({year: year + '-' + (year+9), films: 1});
      }
    return result;
  }();

    $scope.favorite = $localStorage.favorite || [];

    //$scope.favorite = ( localStorage.getItem('favorite') !== null ) ? JSON.parse(localStorage.getItem('favorite')) : [];

    $scope.favorite.forEach(function (item) {
        $scope.movies.forEach(function (movie) {
            if (movie.idIMDB == item.idIMDB) {
                movie.favorite = true;
            }
        });
    });


    $scope.$watch('favorite', function() {
        $localStorage.favorite = $scope.favorite;
    });

    $scope.$watch(function() {
        //return angular.toJson($localStorage);
    }, function() {
        $scope.favorite = $localStorage.favorite;
    });


console.log($scope.favorite);
    $scope.addFavorite = function(movieInfo){

        $scope.favorite.push(movieInfo);
        $scope.movies.forEach(function (movie) {
            if (movie.idIMDB == movieInfo.idIMDB) {
                movie.favorite = true;
            }
        });
       // localStorage.setItem('favorite', JSON.stringify($scope.favorite));
    };

    $scope.removeFavorite = function(id){
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

/*  function unique(arr) {
    var result = [];

    yearsArr.sort();


      for (var i = 0; i < arr.length; i++) {
        var str = arr[i]; // для каждого элемента
        for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
          if (result[j].str == str) {result[j].num+=1; continue nextInput;} // если да, то следующий
        }
        result.push({str: str, num: 1});
      }

    return result;
  }

  var strings = ["кришна", "кришна","8-()", "харе",
    "харе", "харе", "кришна", "кришна", "8-()"
  ];

  console.log( unique(strings) ); // кришна, харе, 8-()*/


//  Movies.getTop().then(
//    function(movies){
//      $scope.movies = movies;
//      movies.forEach(function (item) {
//        Movies.getId(item.idIMDB).then(
//          function(movie){
//            item.trailer = movie.trailer;
//          }
//        );
//
//      });
//    }
//  );


/*  $scope.getDirectors = function (directors) {
    var names = [];

    directors.forEach(function (director) {
      names.push(director.name);
    });

    return names.join(', ');
  };*/


/*  $scope.getTrailer = Movies.getById('tt0111161').then(
    function(movie){
      $scope.mov = movie;
    }
  );*/




}]);
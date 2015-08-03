'use strict';

tlMovies.controller('TopMoviesCtrl', ['$scope', 'Movies', function($scope, Movies){
  $scope.movies = Movies.getData();

  var yearsArr = [];

  $scope.movies.forEach(function (item) {
    yearsArr.push(item.year);
  });

  $scope.film = function (){
    var result = [];
    yearsArr.sort();
    console.log(yearsArr);
    nextInput:
      for (var i = 0; i < yearsArr.length; i++) {
        var year = yearsArr[i];
        for (var j = 0; j < result.length; j++) {
          if (result[j].year == year) {
            result[j].films += 1;
            continue nextInput;
          }
        }
        result.push({year: year, films: 1});
      }
    return result;
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
'use strict';

tlMovies.controller('DecadeCtrl', ['$scope', 'Movies', function($scope, Movies) {
    $scope.chart = 'd3';
    $scope.movies = Movies.getData();

    var yearsArr = [];

    $scope.movies.forEach(function (item) {
        yearsArr.push(Math.floor(item.year / 10) * 10);
    });

    $scope.film = function () {
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
                result.push({year: year, yearRange: year + '-' + (year + 9), films: 1});
            }
        return result;
    }();

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 600,
            x: function (d) {
                return d.yearRange;
            },
            y: function (d) {
                return d.films;
            },
            showLabels: true,
            transitionDuration: 500,
            labelThreshold: 0.01,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };
}]);
'use strict';

tlMovies.controller('FavoriteCtrl', ['$scope', 'Movies', function($scope, Movies){
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
  }();
}]);


/*tlMovies.controller('FavoriteCtrl', ['$scope', function($scope){
  $scope.salesData=[
    {hour: 0,sales: 0},
    {hour: 11,sales: 54},
    {hour: 55,sales: 66},
    {hour: 60,sales: 77},
    {hour: 78,sales: 70},
    {hour: 80,sales: 60},
    {hour: 82,sales: 63},
    {hour: 90,sales: 55},
    {hour: 93,sales: 47},
    {hour: 100,sales: 55},
    {hour: 120,sales: 30}
  ];
}]);

tlMovies.directive('linearChart', ['$window', function($window){
  return{
    restrict:'EA',
    template:"<svg width='850' height='200'></svg>",
    link: function(scope, elem, attrs){
      var salesDataToPlot=scope[attrs.chartData];
      var padding = 20;
      var pathClass="path";
      var xScale, yScale, xAxisGen, yAxisGen, lineFun;

      var d3 = $window.d3;
      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);

      function setChartParameters(){

        xScale = d3.scale.linear()
          .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
          .range([padding + 5, rawSvg.attr("width") - padding]);

        yScale = d3.scale.linear()
          .domain([0, d3.max(salesDataToPlot, function (d) {
            return d.sales;
          })])
          .range([rawSvg.attr("height") - padding, 0]);

        xAxisGen = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(salesDataToPlot.length - 1);

        yAxisGen = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(5);

        lineFun = d3.svg.line()
          .x(function (d) {
            return xScale(d.hour);
          })
          .y(function (d) {
            return yScale(d.sales);
          })
          .interpolate("basis");
      }

      function drawLineChart() {

        setChartParameters();

        svg.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0,180)")
          .call(xAxisGen);

        svg.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(20,0)")
          .call(yAxisGen);

        svg.append("svg:path")
          .attr({
            d: lineFun(salesDataToPlot),
            "stroke": "blue",
            "stroke-width": 2,
            "fill": "none",
            "class": pathClass
          });
      }

      drawLineChart();
    }
  };
}]);*/
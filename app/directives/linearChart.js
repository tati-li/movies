tlMovies.directive('linear', ['$window', function($window){
  return{
    restrict: "E",
    scope: {
      chartData: '='
    },
    templateUrl: "linechart.html",
    link: function(scope, elem, attrs){
      var filmsDataToPlot = scope.chartData;
      var padding = 20;
      var pathClass = "path";
      var xScale, yScale, xAxisGen, yAxisGen, lineFun;

      var d3 = $window.d3;
      var rawSvg = elem.find('svg');
      var svg = d3.select(rawSvg[0]);

      function setChartParameters(){

        xScale = d3.scale.linear()
          .domain([filmsDataToPlot[0].year, filmsDataToPlot[filmsDataToPlot.length-1].year])
          .range([padding + 5, rawSvg.attr("width") - padding]);

        yScale = d3.scale.linear()
          .domain([0, d3.max(filmsDataToPlot, function (d) {
            return d.films;
          })])
          .range([rawSvg.attr("height") - padding, 0]);

        xAxisGen = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(filmsDataToPlot.length - 1);

        yAxisGen = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(5);

        lineFun = d3.svg.line()
          .x(function (d) {
            return xScale(d.year);
          })
          .y(function (d) {
            return yScale(d.films);
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
            d: lineFun(filmsDataToPlot),
            "stroke": "blue",
            "stroke-width": 2,
            "fill": "none",
            "class": pathClass
          });
      }

      drawLineChart();
    }
  };
}]);
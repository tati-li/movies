tlMovies.directive('pie', ['$window', function ($window) {
    return {
        restrict: "E",
        scope: {
            pieData: '=',
            pieWidth: '='
        },
        templateUrl: "d3pieChart.html",
        link: function (scope, elem, attrs) {
            var filmsDataToPlot = scope.pieData;

            var d3 = $window.d3;
            var svg = d3.select('#d3pie-chart');

            var r = scope.pieWidth / 2;
            var color = d3.scale.category20c();

            var vis = svg
                .append("svg:svg")
                .style("width", scope.pieWidth)
                .style("height", scope.pieWidth)
                .data([filmsDataToPlot])
                .append("svg:g")
                .attr("transform", "translate(" + r + "," + r + ")");

            var pie = d3.layout.pie().value(function (d) {
                return d.films;
            });

            var arc = d3.svg.arc().outerRadius(r);

            var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
            arcs.append("svg:path")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", function (d) {
                    return arc(d);
                });

            arcs.append("svg:text").attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            }).attr("text-anchor", "middle").text(function (d, i) {
                    return filmsDataToPlot[i].yearRange;
                }
            );
        }
    };
}]);
'use strict';

/* Directives */

angular.module('myApp.directives', ['myApp.services']).
directive('appVersion', ['version',
  function (version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('d3Histogram', ['$window', 'd3Service', '$log', '$filter',
    function ($window, d3Service, $log, $filter) {
      return {
        scope: {
          histogramData: '=',
          bins: '='
        },
        link: function (scope, element) {

          $log.log('Called d3Histogram link function');

          var svg = d3.select(element[0]);

          // A formatter for counts.
          var formatCount = d3.format(",.0f");

          var margin = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 30
          },
            width = 500 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

          scope.$watch('histogramData', function (newData) {
            scope.render(newData, scope.bins);
          }, true);
          scope.$watch('bins', function (newBins) {
            scope.render(scope.histogramData, newBins);
          }, true);

          scope.render = function (data, bins) {

            svg.selectAll("*").remove();

            if (typeof data === 'undefined' || typeof bins === 'undefined' || !data.responseTimes || parseInt(bins) < 1) {
              return;
            }

            var values = data.responseTimes.split(/\s+/).map(parseFloat);

            if (values.length < 2) {
              return;
            }

            bins = parseInt(bins);
            // $log.log('rendering', values);

            // Generate a Bates distribution of 10 random variables.
            // var values = d3.range(1000).map(d3.random.bates(10));

            var x = d3.scale.linear()
              .domain([d3.min(values), d3.max(values)])
              .range([0, width]);

            var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

            // Generate a histogram using twenty uniformly-spaced bins.
            var data = d3.layout.histogram()
              .bins(bins)
            (values);

            // $log.log('data', data);

            if (!data.length) {
              return;
            }

            var y = d3.scale.linear()
              .domain([0, d3.max(data, function (d) {
                return d.y;
              })])
              .range([height, 0]);

            svg
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var bar = svg.selectAll(".bar")
              .data(data)
              .enter().append("g")
              .attr("class", "bar")
              .attr("transform", function (d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
              });

            bar.append("rect")
              .attr("x", 0)
              .attr("width", x(data[0].x + data[0].dx))
              .attr("height", function (d) {
                return height - y(d.y);
              });

            bar.append("text")
              .attr("dy", ".75em")
              .attr("y", 6)
              .attr("x", x(data[0].x + data[0].dx / 2))
              .attr("text-anchor", "middle")
              .text(function (d) {
                return formatCount(d.y);
              });

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          };

        }
      };
    }
  ]);
/*  .directive('myTest', ['$window', '$log', '$filter',
    function ($window, $log, $filter) {
      return {
        scope: {
          histogramData: '=',
          bins: '='
        },
        link: function (scope, element) {
          element.html(scope.bins + '--' +  scope.histogramData[0]);
        }
      };
    }
  ]);*/

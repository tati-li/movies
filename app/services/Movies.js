"use strict";

tlMovies.service('Movies', ['$q', '$http', '$localStorage', function ($q, $http, $localStorage) {

    return {

        /**
         *
         * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|jQuery.ready.promise|*}
         */
        getTop: function () {
            window.tlMoviesList = [];
            if (!window.myapifilms) {
              window.myapifilms = function (data) {
                window.tlMoviesList = data;
                window.tlMoviesList.forEach(function(movie) {
                  movie.favorite = false;
                  $localStorage.favorite.forEach(function (favorite) {

                       if (movie.idIMDB == favorite.idIMDB) {
                         movie.favorite = true;
                         return;
                       }

                  })
                });
              }
            }

            var res = $q.defer();

            $http.jsonp('http://www.myapifilms.com/imdb/top?format=JSONP&end=20&data=F&callback=JSON_CALLBACK')
                .success(function (result) {
                    console.log('success2: ',result);
                    res.resolve(result);
                })
                .error(function (result, a, b, c) {
                    console.log('error2: ', arguments);
                    res.resolve(window.tlMoviesList);
                });

            return res.promise;
        },

        getId: function (id) {


        var res = $q.defer();

        $http.jsonp('http://www.myapifilms.com/imdb?idIMDB=' + id + '&format=JSONP&trailer=1&callback=JSON_CALLBACK')
          .success(function (result) {
            console.log('success3: ',result);
            res.resolve(result);
          })
          .error(function (result) {
            console.log('error3: ', result);
            res.resolve([]);
          });

        return res.promise;
      }

    };

}]);

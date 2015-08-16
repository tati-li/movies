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
                /**
                 *
                 * @param data
                 */

                /*@warning: Top Movies request doesn't have Callback function myapifilms for JSONP.
                 When I'm trying to get JSON format I have CORS Error: XMLHttpRequest cannot load http://www.myapifilms.com/imdb/top?format=JSON&end=20&data=F. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access.
                 That is why I should write global function myapifilms (with out it we have an Error:
                 top?format=JSONP&end=20&data=F&callback=angular.callbacks._0:1 Uncaught ReferenceError: myapifilms is not defined )
                 At this function I had set global variable 'tlMoviesList' response data of request and added the favorite property from LocalStorage.
                 Global variable 'tlMoviesList' needed to resolve http request with responseData, because http request is going to error box, not in success (I don't know why)*/

                window.myapifilms = function (data) {
                    window.tlMoviesList = data;
                    window.tlMoviesList.forEach(function (movie) {
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
                    console.log('success2: ', result);
                    res.resolve(result);
                })
                .error(function (result, a, b, c) {
                    console.log('error2: ', arguments);
                    res.resolve(window.tlMoviesList);
                });

            return res.promise;
        },

        /**
         *
         * @param id
         * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|jQuery.ready.promise|*}
         */
        getById: function (id) {

            var res = $q.defer();

            $http.jsonp('http://www.myapifilms.com/imdb?idIMDB=' + id + '&format=JSONP&trailer=1&callback=JSON_CALLBACK')
                .success(function (result) {
                    console.log('success3: ', result);
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

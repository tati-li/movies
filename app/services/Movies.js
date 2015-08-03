"use strict";

tlMovies.service('Movies', ['$q', '$http', function ($q, $http) {

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
                console.log('myapi ',data);
              }
            }

            var res = $q.defer();

            $http.jsonp('http://www.myapifilms.com/imdb/top?format=JSONP&end=10&data=F&callback=JSON_CALLBACK')
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
      },

        getData: function() {
          return [
            {
              idIMDB: "tt0111161",
              ranking: 1,
              rating: "9.2",
              title: "The Shawshank Redemption",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1994"
            },
            {
              idIMDB: "tt0068646",
              ranking: 2,
              rating: "9.2",
              title: "The Godfather",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1972"
            },
            {
              idIMDB: "tt0071562",
              ranking: 3,
              rating: "9.0",
              title: "The Godfather: Part II",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BNDc2NTM3MzU1Nl5BMl5BanBnXkFtZTcwMTA5Mzg3OA@@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1974"
            },
            {
              idIMDB: "tt0468569",
              ranking: 4,
              rating: "8.9",
              title: "The Dark Knight",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "2008"
            },
            {
              idIMDB: "tt0110912",
              ranking: 5,
              rating: "8.9",
              title: "Pulp Fiction",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BMjE0ODk2NjczOV5BMl5BanBnXkFtZTYwNDQ0NDg4._V1_UY50_CR0,0,34,50_AL_.jpg",
              year: "1994"
            },
            {
              idIMDB: "tt0108052",
              ranking: 6,
              rating: "8.9",
              title: "Schindler's List",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BMzMwMTM4MDU2N15BMl5BanBnXkFtZTgwMzQ0MjMxMDE@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1993"
            },
            {
              idIMDB: "tt0050083",
              ranking: 7,
              rating: "8.9",
              title: "12 Angry Men",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BODQwOTc5MDM2N15BMl5BanBnXkFtZTcwODQxNTEzNA@@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1957"
            },
            {
              idIMDB: "tt0060196",
              ranking: 8,
              rating: "8.9",
              title: "The Good, the Bad and the Ugly",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1966"
            },
            {
              idIMDB: "tt0167260",
              ranking: 9,
              rating: "8.9",
              title: "The Lord of the Rings: The Return of the King",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BMjE4MjA1NTAyMV5BMl5BanBnXkFtZTcwNzM1NDQyMQ@@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "2003"
            },
            {
              idIMDB: "tt0137523",
              ranking: 10,
              rating: "8.8",
              title: "Fight Club",
              urlPoster: "http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_UX34_CR0,0,34,50_AL_.jpg",
              year: "1999"
            }
          ]
        }


    };

}]);

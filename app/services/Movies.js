var movies = [];
function myapifilms(data) {
    movies = data;
    console.log('myapi ',data);
}
tlMovies.service('Movies', ['$q', '$http', function ($q, $http) {

    return {

        /**
         *
         * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|jQuery.ready.promise|*}
         */
        getTop: function () {
            var res = $q.defer();

            var parms = "format=JSONP&end=20&data=S";
            $.ajax({
                data: parms,
                url: 'http://www.myapifilms.com/imdb/top',
                type: 'get',
                dataType: 'jsonp',
                success: function (response, textStatus, jqXHR) {
                    console.log(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    res.resolve(movies);
                    console.log(arguments);
                }
            });

            //$http.get('http://www.myapifilms.com/imdb/top?format=JSONP&end=20&data=S&callback=JSON_CALLBACK')
            //    .success(function (result) {
            //        console.log(result);
            //        res.resolve(result);
            //    });
            //    /*.error(function (result) {
            //        console.log(result);
            //        res.resolve([]);
            //    });*/

            return res.promise;
        }
    };

}]);

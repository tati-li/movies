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
                console.log('myapi ',window.tlMoviesList);

              }
            }

            var res = $q.defer();

            $http.jsonp('http://www.myapifilms.com/imdb/top?format=JSONP&end=3&data=F&callback=JSON_CALLBACK')
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
          return [{"countries":["USA"],"directors":[{"name":"Frank Darabont","nameId":"nm0001104"}],"filmingLocations":["St. Croix","U.S. Virgin Islands"],"genres":["Crime","Drama"],"idIMDB":"tt0111161","languages":["English"],"metascore":"80/100","originalTitle":"","plot":"Andy Dufresne is a young and successful banker whose life changes drastically when he is convicted and sentenced to life imprisonment for the murder of his wife and her lover. Set in the 1940s, the film shows how Andy, with the help of his friend Red, the prison entrepreneur, turns out to be a most unconventional prisoner.","ranking":1,"rated":"R","rating":"9.3","releaseDate":"19941014","runtime":["142 min"],"simplePlot":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.","title":"The Shawshank Redemption","urlIMDB":"http://www.imdb.com/title/tt0111161","urlPoster":"http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX214_AL_.jpg","votes":"1,494,220","writers":[{"name":"Stephen King","nameId":"nm0000175"},{"name":"Frank Darabont","nameId":"nm0001104"}],"year":"1994"},{"countries":["USA"],"directors":[{"name":"Francis Ford Coppola","nameId":"nm0000338"}],"filmingLocations":["NY Eye and Ear Infirmary","2nd Avenue & East 13th Street","New York City","New York","USA"],"genres":["Crime","Drama"],"idIMDB":"tt0068646","languages":["English","Italian","Latin"],"metascore":"100/100","originalTitle":"","plot":"When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.","ranking":2,"rated":"R","rating":"9.2","releaseDate":"19720324","runtime":["175 min"],"simplePlot":"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.","title":"The Godfather","urlIMDB":"http://www.imdb.com/title/tt0068646","urlPoster":"http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_SX214_AL_.jpg","votes":"1,024,468","writers":[{"name":"Mario Puzo","nameId":"nm0701374"},{"name":"Francis Ford Coppola","nameId":"nm0000338"}],"year":"1972"},{"countries":["USA"],"directors":[{"name":"Francis Ford Coppola","nameId":"nm0000338"}],"filmingLocations":["2045 N. Hibiscus Drive","North Miami","Florida","USA"],"genres":["Crime","Drama"],"idIMDB":"tt0071562","languages":["English","Italian","Spanish","Latin","Sicilian"],"metascore":"80/100","originalTitle":"","plot":"The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.","ranking":3,"rated":"R","rating":"9.1","releaseDate":"19741220","runtime":["200 min"],"simplePlot":"The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.","title":"The Godfather: Part II","urlIMDB":"http://www.imdb.com/title/tt0071562","urlPoster":"http://ia.media-imdb.com/images/M/MV5BNDc2NTM3MzU1Nl5BMl5BanBnXkFtZTcwMTA5Mzg3OA@@._V1_SX214_AL_.jpg","votes":"690,615","writers":[{"name":"Francis Ford Coppola","nameId":"nm0000338"},{"name":"Mario Puzo","nameId":"nm0701374"}],"year":"1974"},{"countries":["USA","UK"],"directors":[{"name":"Christopher Nolan","nameId":"nm0634240"}],"filmingLocations":["Times Square","Causeway Bay","Hong Kong"],"genres":["Action","Crime","Drama"],"idIMDB":"tt0468569","languages":["English","Mandarin"],"metascore":"82/100","originalTitle":"","plot":"Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as The Joker.","ranking":4,"rated":"PG-13","rating":"9.0","releaseDate":"20080718","runtime":["152 min"],"simplePlot":"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.","title":"The Dark Knight","urlIMDB":"http://www.imdb.com/title/tt0468569","urlPoster":"http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY317_CR0,0,214,317_AL_.jpg","votes":"1,468,275","writers":[{"name":"Jonathan Nolan","nameId":"nm0634300"},{"name":"Christopher Nolan","nameId":"nm0634240"}],"year":"2008"},{"countries":["USA"],"directors":[{"name":"Quentin Tarantino","nameId":"nm0000233"}],"filmingLocations":["1435 Flower Street","Glendale","California","USA"],"genres":["Crime","Drama"],"idIMDB":"tt0110912","languages":["English","Spanish","French"],"metascore":"94/100","originalTitle":"","plot":"Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his next fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.","ranking":5,"rated":"R","rating":"8.9","releaseDate":"19941014","runtime":["154 min"],"simplePlot":"The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.","title":"Pulp Fiction","urlIMDB":"http://www.imdb.com/title/tt0110912","urlPoster":"http://ia.media-imdb.com/images/M/MV5BMjE0ODk2NjczOV5BMl5BanBnXkFtZTYwNDQ0NDg4._V1_SY317_CR4,0,214,317_AL_.jpg","votes":"1,162,828","writers":[{"name":"Quentin Tarantino","nameId":"nm0000233"},{"name":"Roger Avary","nameId":"nm0000812"}],"year":"1994"},{"countries":["USA"],"directors":[{"name":"Steven Spielberg","nameId":"nm0000229"}],"filmingLocations":["Józefa","Kraków","Malopolskie","Poland"],"genres":["Biography","Drama","History"],"idIMDB":"tt0108052","languages":["English","Hebrew","German","Polish"],"metascore":"93/100","originalTitle":"","plot":"Oskar Schindler is a vainglorious and greedy German businessman who becomes an unlikely humanitarian amid the barbaric Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament for the good in all of us.","ranking":6,"rated":"R","rating":"8.9","releaseDate":"19940204","runtime":["195 min"],"simplePlot":"In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.","title":"Schindler's List","urlIMDB":"http://www.imdb.com/title/tt0108052","urlPoster":"http://ia.media-imdb.com/images/M/MV5BMzMwMTM4MDU2N15BMl5BanBnXkFtZTgwMzQ0MjMxMDE@._V1_SX214_AL_.jpg","votes":"758,792","writers":[{"name":"Thomas Keneally","nameId":"nm0447745"},{"name":"Steven Zaillian","nameId":"nm0001873"}],"year":"1993"},{"countries":["USA"],"directors":[{"name":"Sidney Lumet","nameId":"nm0001486"}],"filmingLocations":["New York County Courthouse - 60 Centre Street","New York City","New York","USA"],"genres":["Crime","Drama"],"idIMDB":"tt0050083","languages":["English"],"metascore":"","originalTitle":"","plot":"The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case of murder soon becomes a detective story that presents a succession of clues creating doubt, and a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other. Based on the play, all of the action takes place on the stage of the jury room.","ranking":7,"rated":"NOT RATED","rating":"8.9","releaseDate":"195704","runtime":["96 min"],"simplePlot":"A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.","title":"12 Angry Men","urlIMDB":"http://www.imdb.com/title/tt0050083","urlPoster":"http://ia.media-imdb.com/images/M/MV5BODQwOTc5MDM2N15BMl5BanBnXkFtZTcwODQxNTEzNA@@._V1_SX214_AL_.jpg","votes":"382,766","writers":[{"name":"Reginald Rose","nameId":"nm0741627"}],"year":"1957"},{"countries":["Italy","Spain","West Germany","USA"],"directors":[{"name":"Sergio Leone","nameId":"nm0001466"}],"filmingLocations":["Almería","Andalucía","Spain"],"genres":["Western"],"idIMDB":"tt0060196","languages":["Italian"],"metascore":"90/100","originalTitle":"Il buono, il brutto, il cattivo","plot":"Blondie (The Good) is a professional gunslinger who is out trying to earn a few dollars. Angel Eyes (The Bad) is a hit man who always commits to a task and sees it through, as long as he is paid to do so. And Tuco (The Ugly) is a wanted outlaw trying to take care of his own hide. Tuco and Blondie share a partnership together making money off Tuco's bounty, but when Blondie unties the partnership, Tuco tries to hunt down Blondie. When Blondie and Tuco come across a horse carriage loaded with dead bodies, they soon learn from the only survivor (Bill Carson) that he and a few other men have buried a stash of gold in a cemetery. Unfortunately Carson dies and Tuco only finds out the name of the cemetery, while Blondie finds out the name on the grave. Now the two must keep each other alive in order to find the gold. Angel Eyes (who had been looking for Bill Carson) discovers that Tuco and Blondie meet with Carson and knows they know the location of the gold. All he needs is for the two to ...","ranking":8,"rated":"NOT RATED","rating":"8.9","releaseDate":"19680308","runtime":["161 min"],"simplePlot":"A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.","title":"The Good, the Bad and the Ugly","urlIMDB":"http://www.imdb.com/title/tt0060196","urlPoster":"http://ia.media-imdb.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SX214_AL_.jpg","votes":"446,602","writers":[{"name":"Luciano Vincenzoni","nameId":"nm0898812"},{"name":"Sergio Leone","nameId":"nm0001466"}],"year":"1966"},{"countries":["USA","New Zealand"],"directors":[{"name":"Peter Jackson","nameId":"nm0001392"}],"filmingLocations":["Camperdown Studios","Camperdown Road","Miramar","Wellington","New Zealand"],"genres":["Adventure","Fantasy"],"idIMDB":"tt0167260","languages":["English","Quenya","Old English","Sindarin"],"metascore":"94/100","originalTitle":"","plot":"While Frodo & Sam continue to approach Mount Doom to destroy the One Ring, unaware of the path Gollum is leading them, the former Fellowship aid Rohan & Gondor in a great battle in the Pelennor Fields, Minas Tirith and the Black Gates as Sauron wages his last war against Middle-Earth.","ranking":9,"rated":"PG-13","rating":"8.9","releaseDate":"20031217","runtime":["201 min"],"simplePlot":"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.","title":"The Lord of the Rings: The Return of the King","urlIMDB":"http://www.imdb.com/title/tt0167260","urlPoster":"http://ia.media-imdb.com/images/M/MV5BMjE4MjA1NTAyMV5BMl5BanBnXkFtZTcwNzM1NDQyMQ@@._V1_SX214_AL_.jpg","votes":"1,071,014","writers":[{"name":"J.R.R. Tolkien","nameId":"nm0866058"},{"name":"Fran Walsh","nameId":"nm0909638"}],"year":"2003"},{"countries":["USA","Germany"],"directors":[{"name":"David Fincher","nameId":"nm0000399"}],"filmingLocations":["421 W. Eighth Street","Los Angeles","California","USA"],"genres":["Drama"],"idIMDB":"tt0137523","languages":["English"],"metascore":"66/100","originalTitle":"","plot":"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.","ranking":10,"rated":"R","rating":"8.9","releaseDate":"19991015","runtime":["139 min"],"simplePlot":"An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...","title":"Fight Club","urlIMDB":"http://www.imdb.com/title/tt0137523","urlPoster":"http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_SX214_AL_.jpg","votes":"1,173,089","writers":[{"name":"Chuck Palahniuk","nameId":"nm0657333"},{"name":"Jim Uhls","nameId":"nm0880243"}],"year":"1999"}]
        }


    };

}]);

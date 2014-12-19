
;


(function (window, undefined) {

    "use strict";

    var newMovies = "new-movies",
        moviesTTL = 86400000, //24 hours
        apiKey = "fghr8zjnazt4w7fuza4se7wp",
        rtRoot = "http://api.rottentomatoes.com/api/public/v1.0/",
        defaultPageLimit = 20;


    var Movies = function (cache) {

        var movies = new Movies.fn.init();

        movies.cache = cache;

        return movies;

    };

    Movies.fn = Movies.prototype = {

        constructor: Movies,

        init: function () {
            return this;
        },


        cache: undefined,

        cachedMovies: function (key) {

        },

        getNewMovies: function (callback) {

            //might want to duck type to make the methods overloaded.

            var movie = this,
                url = rtRoot + "lists/movies/opening.json?apikey=" +
                    apiKey + "&page_limit=" +
                        defaultPageLimit + "&page=1",
                cached = movie.cache.getObject(newMovies);

            if (cached) {

                if (callback) {
                    callback(cached);
                }

            } else {

                reqwest({
                    url: url,
                    type: "jsonp"
                })
                 .then(function (resp) {

                     movie.cache.setObject(newMovies, resp.movies, moviesTTL);

                     if (callback) {
                         callback(resp.movies);
                     }

                 })
                 .fail(function (e) {

                     console.error("just look at what you have done!");

                 });

            }

        },

        doAJAX: function (url, callback) {

            var movie = this,
                xhr = new XMLHttpRequest();

            xhr.open("GET", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "jsonp");

            xhr.onreadystatechange = function (e) {

                if (xhr.readyState === 4 && xhr.status == 200 && callback) {

                    if (callback) {
                        callback(xhr.responseText);
                    }

                }
            }

            xhr.send();

        }

    }

    // Give the init function the Movies prototype for later instantiation
    Movies.fn.init.prototype = Movies.fn;

    return (window.Movies = Movies);

}(window));

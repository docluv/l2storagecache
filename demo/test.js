var cache = l2Storeagecache({
    ttlKey: "cacheTTL-"
    }),
    movies = Movies(cache),
    renderMovies = function (movies) {

        var html = "",
            i = 0,
            tmpl = "<li>{{foo}}</li>",
            anchor = document.querySelector(".movie-list");

        if (movies && anchor) {
            
            for (; i < movies.length; i++) {
                html += "<li>" + movies[i].title + "</li>";
            }

            anchor.innerHTML = html;

        }

    };


movies.getNewMovies(renderMovies);



import { gridModal, modalArticle } from "./commons/modals.js";
import { fetchJson } from "./utils/fetch.js";

document.addEventListener('DOMContentLoaded', async () => {

    try {

        let trendingArray = await fetchJson('https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e', null)
        let topRatedArray = await fetchJson('https://api.themoviedb.org/3/movie/top_rated?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US&page=1', null)

        // console.log(trendingArray)

        let trendingSection = document.querySelector("#trending")
        let topRatedSection = document.querySelector("#top-rated")

        let searchInput = document.querySelector("#search-input")

        searchInput.addEventListener('keypress', async e => {

            // e.preventDefault(); // como no uso el form, no hace falta
            console.log(e);

            // Search and show info in the grid modal when "enter" is pressed:

            if (e.key == "Enter") {

                let searchString = e.target.value;
                // console.log(searchString)

                let searchedMediaArray = await fetchJson(`https://api.themoviedb.org/3/search/multi?api_key=e65c4db5bae2b9b0565c97b1e317145e&query=${searchString}&page=1&include_adult=false`)

                console.log(searchedMediaArray);

                gridModal(searchedMediaArray);

            }

        });


        for (let i = 0; i < 5; i++) {

            let title = trendingArray[i].media_type == "movie" ? "title" : "name";
            let releaseDate = trendingArray[i].media_type == "movie" ? "release_date" : "first_air_date";
            let mediaType = trendingArray[i].media_type == "movie" ? "Movie" : "Tv Show";

            // console.log(mediaType);

            let image = document.createElement('img');
            image.src = `https://image.tmdb.org/t/p/w342${trendingArray[i].poster_path}`
            image.alt = `${trendingArray[i][title]} Poster`
            // TMDB "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]

            let rating = document.createElement('div');
            rating.classList.add('rating');
            rating.innerText = trendingArray[i].vote_average.toFixed(1);
            
            let imageContainer = document.createElement('div')
            imageContainer.classList.add("image-container")
            imageContainer.appendChild(rating);
            imageContainer.appendChild(image);

            let h3 = document.createElement('h3');
            h3.classList.add("title");
            h3.innerText = trendingArray[i][title];

            let pDate = document.createElement('p');
            pDate.classList.add("release-date");
            pDate.innerText = trendingArray[i][releaseDate];

            let pType = document.createElement('p');
            pType.classList.add("media-type");
            pType.innerText = mediaType;

            let article = document.createElement('article');
            article.classList.add("trending")
            article.classList.add("card")
            article.id = `article-${i}`

            article.appendChild(imageContainer);
            article.appendChild(h3);
            article.appendChild(pDate);
            article.appendChild(pType);

            trendingSection.appendChild(article);

            modalArticle(article, trendingArray[i]);
        };

        // let rightButton = document.createElement('button');
        // rightButton.setAttribute('id', 'trending-right')

        // let leftButton = document.createElement('button');
        // leftButton.setAttribute('id', 'trending-right')

        // trendingSection.appendChild(rightButton);

        // rightButton.addEventListener('click', () => {

        //     trendingSection.scrollLeft += trendingSection.offsetWidth;
        // })

        // trendingArray.forEach((media, index) => {

        //     if(index == 5) return;

        //     trendingSection.innerHTML += 
        //         `<article id="trending${index + 1}" class="trending card">
        //             <img src="https://image.tmdb.org/t/p/original${media.poster_path}"
        //                 alt="${media.title} Poster">
        //             <h3 class="title">${media.title}</h3>
        //             <p class="release-date">${media.release_date}</p>
        //          </article>`


        //     // console.log(trendingArticle);
        //     // trendingSection.appendChild(trendingArticle)
        //   });

        // console.log(trendingArticle);



    } catch (error) {
        alert(error)
    }



})


import { modalArticle } from "./utils/modals.js";


document.addEventListener('DOMContentLoaded', async () => {

    let response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e')

    let data = await response.json()
    // console.log(data)

    let trendingArray = data.results

    console.log(trendingArray)

    let trendingSection = document.querySelector("#trending")

    // console.log(trendingSection)

    for (let i = 0; i < 5; i++) {

        let title = trendingArray[i].media_type == "movie" ? "title" : "name";
        let releaseDate = trendingArray[i].media_type == "movie" ? "release_date" : "first_air_date";
        let mediaType = trendingArray[i].media_type == "movie" ? "Movie" : "Tv Show";
        
        // console.log(mediaType);
        
        let image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w342${trendingArray[i].poster_path}`
        image.alt = `${trendingArray[i][title]} Poster`
        //  "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]


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

        article.appendChild(image);
        article.appendChild(h3);
        article.appendChild(pDate);
        article.appendChild(pType);

        trendingSection.appendChild(article);
    };

    modalArticle();

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


})


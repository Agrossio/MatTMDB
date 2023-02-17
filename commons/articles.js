import { modalArticle } from "./modals.js";



function generateSection (mediaArray, section){


    for (let i = 0; i < 5; i++) {

        console.log(mediaArray);

        let title = mediaArray[i].media_type == "movie" ? "title" : "name";
        let releaseDate = mediaArray[i].media_type == "movie" ? "release_date" : "first_air_date";
        let mediaType = mediaArray[i].media_type == "movie" ? "Movie" : "Tv Show";

        // console.log(mediaType);

        let image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w342${mediaArray[i].poster_path}`
        image.alt = `${mediaArray[i][title]} Poster`
        // TMDB "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]

        let rating = document.createElement('div');
        rating.classList.add('rating');
        rating.innerText = mediaArray[i].vote_average.toFixed(1);
        
        let imageContainer = document.createElement('div')
        imageContainer.classList.add("image-container")
        imageContainer.appendChild(rating);
        imageContainer.appendChild(image);

        let h3 = document.createElement('h3');
        h3.classList.add("title");
        h3.innerText = mediaArray[i][title];

        let pDate = document.createElement('p');
        pDate.classList.add("release-date");
        pDate.innerText = mediaArray[i][releaseDate];

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

        section.appendChild(article);

        modalArticle(article, mediaArray[i]);
    };

}

export { generateSection };
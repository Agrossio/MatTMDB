import { generateSection } from "./commons/articles.js";
import { gridModal, modalArticle } from "./commons/modals.js";
import { fetchJson } from "./utils/fetch.js";
import { validateInputs } from "./utils/validations.js";

document.addEventListener('DOMContentLoaded', async () => {

    try {

        let trendingArray = await fetchJson('https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e', null)
        let topRatedArray = await fetchJson('https://api.themoviedb.org/3/discover/tv?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1', null)

        // https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e
        // https://api.themoviedb.org/3/movie/top_rated?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US&page=1

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

        generateSection(trendingArray, trendingSection) // esto seria para usar si puedo lograr hacer andar los modulos: meter el for dentro del generateSection pasando mediaArray y una section
        generateSection(topRatedArray, topRatedSection)
        
        let registerForm = document.querySelector('.register-form-modal-content');
        let userInput = document.querySelector('#register-user');
        let emailInput = document.querySelector('#register-email');
        let pass1Input = document.querySelector('#register-pass1');
        let pass2Input = document.querySelector('#register-pass2');


        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userValue = userInput.value;
            const emailValue = emailInput.value;
            const pass1Value = pass1Input.value;
            const pass2Value = pass2Input.value;

            validateInputs(userInput, pass1Input, pass2Input, emailInput);
            
            fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: userValue,
                    password: pass1Value,
                    email: emailValue
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Registro OK');
                    console.log(data);
                   // location.href = "../IniciarSesión/login.html"

                   document.getElementById('register').style.display='none';
                   document.getElementById('login').style.display='block';

                })
                .catch(function (error) {
                    document.getElementById('register').style.display='none';
                    document.getElementById('login').style.display='block';
                    console.error(error);
                });
            
            
        })
        


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


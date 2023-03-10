import { generateSection } from "./commons/articles.js";
import { gridModal } from "./commons/modals.js";
import { fetchJson } from "./utils/fetch.js";
import { userFormListener } from "./utils/forms.js";
import { logout, viewProfile } from "./utils/menu.js";

document.addEventListener('DOMContentLoaded', async () => {

    /*---------------------------------- REGISTER FORM ------------------------------------*/
    let registerForm = document.querySelector('.register-form-modal-content');
    let userInput = document.querySelector('#register-user');
    let emailInput = document.querySelector('#register-email');
    let pass1Input = document.querySelector('#register-pass1');
    let pass2Input = document.querySelector('#register-pass2');

    // agrego listener al register form:
    userFormListener(registerForm, userInput, emailInput, pass1Input, pass2Input);


    /*------------------------------------ LOGIN FORM ------------------------------------*/
    let loginForm = document.querySelector('.login-form-modal-content');
    let emailLoginInput = document.querySelector('#login-email');
    let passLoginInput = document.querySelector('#login-pass');

    // agrego listener al login form:
    userFormListener(loginForm, null, emailLoginInput, passLoginInput, null);


    /*---------------------------------- SESSION INFO ------------------------------------*/
    let userSession = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
    };

    let registerBtn = document.querySelector("#register-btn");
    let loginBtn = document.querySelector("#login-btn");
    let profileDropdown = document.querySelector("#profile-dropdown");
    let profileBtn = document.querySelector("#profile-btn");
    let logoutBtn = document.querySelector("#logout-btn");

    viewProfile(profileBtn, userSession, registerForm, userInput, emailInput, pass1Input, pass2Input);
    logout(logoutBtn);

    console.log("USER SESSION", userSession);

    if (userSession.userId) {
        registerBtn.classList.add('hidden');
        loginBtn.classList.add('hidden');
        profileDropdown.classList.remove('hidden')
        logoutBtn.classList.remove('hidden')

        let username = profileDropdown.children[0];

        let icon = document.createElement('img');
        icon.classList.add('fa');
        icon.classList.add('fa-caret-down');
        icon.setAttribute('src', './assets/drop-down-arrow-16px.png')

        username.innerText = `${userSession.username} `;
        username.appendChild(icon);

    }

    /*---------------------------- GENERATE SECTIONS INFO --------------------------------*/

    try {

        let trendingArray = await fetchJson('https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e')
        let topRatedArray = await fetchJson('https://api.themoviedb.org/3/discover/tv?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1')

        // console.log(trendingArray)

        let trendingSection = document.querySelector("#trending")
        let topRatedSection = document.querySelector("#top-rated")

        generateSection(trendingArray, trendingSection)
        generateSection(topRatedArray, topRatedSection)


    /*---------------------------- SEARCH INPUT --------------------------------*/

        let searchInput = document.querySelector("#search-input")

        searchInput.addEventListener('keypress', async e => {

            // e.preventDefault(); // como no uso el form, no hace falta
            // console.log(e);

            // Search and show info in the grid modal when "enter" is pressed:

            if (e.key == "Enter") {

                let searchString = e.target.value;
                // console.log(searchString)

                let searchedMediaArray = await fetchJson(`https://api.themoviedb.org/3/search/multi?api_key=e65c4db5bae2b9b0565c97b1e317145e&query=${searchString}&page=1&include_adult=false`)

                console.log(searchedMediaArray);

                gridModal(searchedMediaArray);

            }

        });


    } catch (error) {
        alert(error)
    }



})


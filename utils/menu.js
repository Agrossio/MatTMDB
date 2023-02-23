import { userFormListener } from "./forms.js";
import { fetchJson } from "./fetch.js";

function viewProfile(profileBtn, userSession, registerForm, userInput, emailInput, pass1Input, pass2Input) {

    profileBtn.addEventListener('click', e => {

        // uso el register form para mostrar los datos del usuario y permitir editarlos:
        userInput.value = userSession.username;
        emailInput.value = userSession.email;
        emailInput.setAttribute('disabled', '')

        let formContainer = registerForm.children[0];
        let formTitle = formContainer.children[0];
        let formSubTitle = formContainer.children[1];
        let repeatInput = formContainer.children[6];
        
        formTitle.innerText = 'Profile';
        formSubTitle.innerText = 'Edit your account information';


        let cancelBtn = document.querySelector('.cancelbtn');
        cancelBtn.innerText = 'Delete Account';

        let registerBtn = document.querySelector('#register-form-btn');
        registerBtn.innerText = 'Save Changes';

        repeatInput.style.display = 'none';

        document.getElementById('register').style.display = 'block';

        cancelBtn.addEventListener('click', async e => {

           let response = await fetchJson(`http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users/${userSession.userId}`, 'DELETE');
           console.log(response); 
           
            alert(response.message);
            localStorage.clear();
            // armar un endpoint a /me mandando un body con la info de la session para que me cargue la info de la session
            document.location.reload();
        })

        userFormListener(registerForm, userInput, emailInput, pass1Input, null, userSession);
    })

}


function logout(logoutBtn) {

    logoutBtn.addEventListener('click', e => {
        localStorage.clear();

        // armar un endpoint a /me mandando un body con la info de la session para que me cargue la info de la session
        document.location.reload();
    })
}


export { viewProfile, logout }
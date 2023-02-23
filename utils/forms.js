import { fetchJson } from "./fetch.js";
import { validateInputs, validateLoginInputs } from "./validations.js";

function userFormListener(registerForm, userInput, emailInput, pass1Input, pass2Input) {

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // LOGIN:

            /****************************** Logica Back **********************************
                1) obtener los datos del request
                2) obtener los datos del usuario (el usuario provee su mail y password)
                3) con el mail obtengo el salt de la base de datos
                4) con el password y el salt valido su contrateña
                5) si es incorrecta respondo con 401 (unauthorized)
                6) si es correcta genero un payload, genero un token, guardo el token en
                   un cookie o localstorage en el browser, respondo con el payload
            ******************************************************************************/

        if (userInput === null) {

            const emailValue = emailInput.value;
            const passValue = pass1Input.value;

            const validatedForm = validateLoginInputs(emailInput, pass1Input);
            console.log(validatedForm)

            if (validatedForm) {

                let body = JSON.stringify({
                    email: emailValue,
                    password: passValue,
                })

                console.log(body);

                try {

                    let response = await fetchJson("http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users/login", 'POST', body)
                    console.log(response);

                    if(response.statusCode == 401){
                        alert(response.message)
                    } else {
                        
                        // hide register form:
                        document.getElementById('login').style.display = 'none';
    
                        localStorage.setItem('userid', response.response.userId);
                        localStorage.setItem('username', response.response.username);
                        localStorage.setItem('email', response.response.email);
                        
                        // armar un endpoing a /me mandando un body vacio para que me borre la session
                        document.location.reload();

                        // show profile form (me falta crear el perfil):
                        //document.getElementById('profile').style.display = 'block';
                    }

                } catch (error) {

                    document.getElementById('register').style.display = 'none';
                    // document.getElementById('login').style.display='block';
                    console.error(error);
                }
            }


            // REGISTER:
        } else {

            const userValue = userInput.value;
            const emailValue = emailInput.value;
            const pass1Value = pass1Input.value;
            const pass2Value = pass2Input.value;

            const validatedForm = validateInputs(userInput, pass1Input, pass2Input, emailInput);
            console.log(validatedForm)

            if (validatedForm) {

                let body = JSON.stringify({
                    username: userValue,
                    password: pass1Value,
                    email: emailValue
                })

                try {

                    let response = await fetchJson("http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users", 'POST', body)
                    console.log(response);

                    // hide register form:
                    document.getElementById('register').style.display = 'none';

                    // show login form:
                    document.getElementById('login').style.display = 'block';

                } catch (error) {

                    document.getElementById('register').style.display = 'none';
                    // document.getElementById('login').style.display='block';
                    console.error(error);
                }
            }
        }
    })

}

export { userFormListener }
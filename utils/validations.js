function validateLoginInputs(emailInput, passInput) {

    console.log("entro en validacion");

    const emailValue = emailInput.value;
    const passValue = passInput.value;

    let emailOk = false;
    let passOk = false;

    // email validation:
    if (!emailValue) {
        validatefailure("Please enter a valid email", emailInput);
    } else if (!validEmail(emailValue)) {
        validatefailure("Please enter a valid email", emailInput);
    } else if (emailValue) {
        validationOk(emailInput);
        emailOk = true;
    }
    
    // password validation:
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if (!passValue) {
        validatefailure("Please enter a password", passInput);
    } else if (passValue.length < 7){
        validatefailure("Your password must have more than 7 characters", passInput);
    // } else if (!passValue.match(regexPass)){            // COMENTADO EN MODO DESARROLLO
    //     validatefailure("It must have at least one uppercase, one lowercase and one number", passInput)
    } else {
        validationOk(passInput);
        passOk = true;
    }


    if(emailOk === true && passOk === true) {
        return true
    }

}


function validateInputs(userInput, pass1Input, pass2Input = null, emailInput = null) {

    console.log("entro en validacion");

    const userValue = userInput.value;
    const emailValue = emailInput.value;
    const pass1Value = pass1Input.value;
    const pass2Value = pass2Input.value;

    let userOk = false;
    let emailOk = false;
    let pass1Ok = false;
    let pass2Ok = false;

    // user validation:
    if (!userValue) {
        validatefailure("Please enter an Username", userInput);
    } else {
        validationOk(userInput);
        userOk = true;
    }

    // email validation:
    if (!emailValue) {
        validatefailure("Please enter a valid email", emailInput);
    } else if (!validEmail(emailValue)) {
        validatefailure("Please enter a valid email", emailInput);
    } else if (emailValue) {
        validationOk(emailInput);
        emailOk = true;
    }
    
    // password validation:
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if (!pass1Value) {
        validatefailure("Please enter a password", pass1Input);
    } else if (pass1Value.length < 7){
        validatefailure("Your password must have more than 7 characters", pass1Input);
    // } else if (!pass1Value.match(regexPass)){            // COMENTADO EN MODO DESARROLLO
    //     validatefailure("It must have at least one uppercase, one lowercase and one number", pass1Input)
    } else {
        validationOk(pass1Input);
        pass1Ok = true;
    }

    if (pass1Value != pass2Value){
        validatefailure("Passwords do not match", pass2Input)
    } else {
        validationOk(pass2Input);
        pass2Ok = true;
    }

    if(userOk == true && emailOk === true && pass1Ok === true && pass2Ok === true) {
        return true
    }

}

function validEmail(emailValue) {

    return emailValue.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

}
function validatefailure(msg, input) {

    let inputContainer = input.parentElement;
    let inputP = inputContainer.querySelector('p');

    inputP.innerText = msg;
    inputContainer.className = "validation-failure";

}

function validationOk(input) {

    let inputContainer = input.parentElement;
    let inputP = inputContainer.querySelector('p');

    inputContainer.className = "validation-container";

}




export { validateLoginInputs, validateInputs }
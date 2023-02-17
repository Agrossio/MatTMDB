function validateInputs(userInput, pass1Input, pass2Input = null, emailInput = null) {

    console.log("entro en validacion");

    const userValue = userInput.value;
    const emailValue = emailInput.value;
    const pass1Value = pass1Input.value;
    const pass2Value = pass2Input.value;

    if (!userValue) {
        validatefailure("Please enter an Username", userInput);
    } else {
        validationOk(userInput);
    }

    if (!emailValue) {
        validatefailure("Please enter a valid email", emailInput);
    } else if (!validEmail(emailValue)) {
        console.log("HOLA");
        validatefailure("Please enter a valid email", emailInput);
    } else if (emailValue) {
        validationOk(emailInput);
    }
    
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if (!pass1Value) {
        validatefailure("Please enter a password", pass1Input);
    } else if (pass1Value.length < 7){
        validatefailure("Your password must have more than 7 characters", pass1Input);
    } else if (!pass1Value.match(regexPass)){
        validatefailure("It must have at least one uppercase, one lowercase and one number", pass1Input)
    } else {
        validationOk(pass1Input);
    }

    if (pass1Value != pass2Value){
        validatefailure("Passwords do not match", pass2Input)
    } else {
        validationOk(pass2Input);
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




export { validateInputs }
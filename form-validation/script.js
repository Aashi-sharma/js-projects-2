const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');


let isValid = false;
let passwordsMatch = false;

function validateForm(){
   isValid = form.checkValidity(); 
   //Message for an error
   if(!isValid) {
    message.textContent='Please fill out all the values.';
   message.style.color = 'red';
   messageContainer.style.borderColor='red';
   return; }

   //Check if password matches
   if(password1El.value === password2El.value)
{
   passwordsMatch = true;
   password1El.style.borderColor = 'green';
   password2El.style.borderColor = 'green'; 
} else {
    passwordsMatch = false;
    message.textContent = 'Make sure password matches.';
    message.style.cColor= 'red';
    messageContainer.style.borderColor='red';
   
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
return;


}

//If form is valid and password match
if(isValid && passwordsMatch){
    message.textContent = 'Successfully Registered';
    message.style.cColor= 'green';
    messageContainer.style.borderColor='green';
}

}
function storeFormData(){
    const user = {
name: form.name.value,
phone: form.phone.value,
email: form.email.value,
website: form.website.value,
password: form.password.value

    };
console.log(user);
}
function processFormData(e){
    e.preventDefault();
    //Validate form
    validateForm();
//submit data if valid
if(isValid && passwordsMatch){
    storeFormData();
}

}

//Event listeners
form.addEventListener('submit',processFormData);


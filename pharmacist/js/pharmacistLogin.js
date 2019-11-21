
const removeStyle = (input,inputError)=> {
    input.addEventListener('blur',()=>{
    input.classList.remove('isInvalid');
    inputError.textContent = " ";
    });
};

const validateEmail = (emailInput)=> {
 const regex = /@/;
 if(regex.test(emailInput)){
     return true;
 } else {
     return false;
 };
};
 
document.Login.register.addEventListener('click',(event)=>{
let email = document.Login.email.value;
let password = document.Login.password.value;
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passError')
    event.preventDefault(); 
    let errorCounter = 0;

    if(email === ""){
        emailError.textContent = "Please Enter Your Email";
        document.Login.email.classList.add('isInvalid');
        errorCounter++;
    } else if(!validateEmail(email)){
    emailError.textContent = "Email format is invalid e.g me@example.com";
    document.Login.email.classList.add('isInvalid');
    errorCounter++;  
}
 else{
        emailError.textContent =""; 
        document.Login.email.classList.remove('isInvalid');
        email = email;
  }

  if(password === "") {
      passwordError.textContent = "Please enter your password";
      document.Login.password.classList.add('isInvalid');
    errorCounter++; 
  } else if(password.length < 8){
   passwordError.textContent = "password should be greater than 8 characters";
   document.Login.password.classList.add('isInvalid');
   errorCounter++; }
  else{
    passwordError.textContent = "";
    document.Login.password.classList.remove('isInvalid');
    password = password;
  }

  removeStyle(document.Login.email,emailError);
  removeStyle(document.Login.password,passwordError);
  if(errorCounter == 0){
      // --- IF NO ERROR OCCURS HANDLING API AND 
      // ---- REDIRECT DOCTOR TO DASHBOARD
    const URL = 'https://virtual-healthcare.herokuapp.com/oauth/token';
    const data = {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'yXn2BSQRRaPGhkBJbYtmRV3T9AFx8MWl79LdASrN',
        email : email,
        password: password,
        provider: 'pharmacists'
    };
   
  axios.post(URL,JSON.stringify(data)).then(
      data => console.log(data.json).catch(
          err => console.log(err)
      )
  )
    
}

});




//------- HANDLING API FOR DOCTOR LOGIN --------

const removeStyle = ()=> {
    document.doctorLogin.email.addEventListener('blur',()=>{
    document.doctorLogin.email.classList.remove('isInvalid');
    document.querySelector('.emailError').textContent = " ";
    })
}

const validateEmail = (emailInput)=> {
 const regex = /@/;
 if(regex.test(emailInput)){
     return true;
 } else {
     return false;
 }
}

document.doctorLogin.register.addEventListener('click',(event)=>{
const email = document.doctorLogin.email.value;
const password = document.doctorLogin.password.value;
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passError')
    event.preventDefault(); 
    let errorCounter = 0;

    if(email === ""){
        emailError.textContent = "Please Enter Your Email";
        document.doctorLogin.email.classList.add('isInvalid');
        errorCounter++;
    } else if(!validateEmail(email)){
    emailError.textContent = "Email format is invalid e.g me@example.com";
    document.doctorLogin.email.classList.add('isInvalid');
    errorCounter++;  
}
 else{
        emailError.textContent =""; 
        document.doctorLogin.email.classList.remove('isInvalid');
  }

  if(password === "") {
      passwordError.textContent = "Please enter your password";
      document.doctorLogin.password.classList.add('isInvalid');
    errorCounter++; 
  } else if(password.length < 8){
   passwordError.textContent = "password should be greater than 8 characters";
   document.doctorLogin.password.classList.add('isInvalid');
   errorCounter++; }
  else{
    passwordError.textContent = "";
    document.doctorLogin.password.classList.remove('isInvalid');
  }

  removeStyle();
  
  if(errorCounter == 0) 
  {
      // --- IF NO ERROR OCCURS HANDLING API AND 
      // ---- REDIRECT DOCTOR TO DASHBOARD
  alert('login succesfull')
  }
});




const fullNameError = document.querySelector('.fullnameError');
const emailError = document.querySelector(".emailError");
const phoneError = document.querySelector(".phoneError");
const createPaswordError = document.querySelector(".passwordError");
const confirmPasswordError = document.querySelector(".confirmPasswordError")

validateForm = (event)=>{
   event.preventDefault();

   if(document.doctorLogin.fullname.value === "") {
      fullNameError.textContent = "Please Enter Your User Name";
   }else {
       fullNameError.textContent = "";
   }

   if(document.doctorLogin.email.value === ""){
       emailError.textContent = "Please Enter Your Email ";
   }else {
       emailError.textContent = "";
   }

   if(document.doctorLogin.phone.value === ""){
       phoneError.textContent = "Please Enter Your Phone Number ";
   }else {
       phoneError.textContent = "";
   } 

   if(document.doctorLogin.createPassword.value === ""){
       createPaswordError.textContent = "Please Enter Your Your Password";
   }else if(document.doctorLogin.createPassword.value.length === document.doctorLogin.confirmPassword.value.length){
     createPaswordError.textContent = "The password entered does not match";
   } else{
       createPaswordError.textContent = "";
   }
  
   
 }
 
 
 document.doctorLogin.register.addEventListener('click',validateForm)
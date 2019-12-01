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
let email = document.doctorLogin.email.value;
let password = document.doctorLogin.password.value;
let emailError = document.querySelector('.emailError');
let passwordError = document.querySelector('.passError')
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
        email = email;
  }

  if(password === "") {
      passwordError.textContent = "Please enter your password";
      document.doctorLogin.password.classList.add('isInvalid');
    errorCounter++; 
  } else if(password.length < 8){
    //passwordError.textContent = "password should be greater than 8 characters";
    document.doctorLogin.password.classList.add('isInvalid');
    errorCounter++; }
     else{
    passwordError.textContent = "";
    document.doctorLogin.password.classList.remove('isInvalid');
    password = password;
    }

  removeStyle();
  
  if(errorCounter == 0) {
      // --- IF NO ERROR OCCURS HANDLING API AND 
      // ---- REDIRECT DOCTOR TO DASHBOARD
      const url = "https://virtual-healthcare.herokuapp.com/oauth/token";
      const data = {
          grant_type:'password',
          username: email,
          password : password,
          client_id : '2',
          client_secret: "Z74s1YLfKaF3WxRYhO8feG42vY1zqmr7HNCX7Nh8",
          provider: 'pharmacists'
      }
      axios.post(url,data)
      .then(
          (res) => {
              console.log(res)
              if(res.data.token_type == "Bearer"){
                  var token = res.data.access_token;
                  console.log(res)
                  window.localStorage.setItem("access_token",token);
                  window.localStorage.getItem("user_id",)
                  window.location = "doctorDashboard.html"
              }
          }
      ).catch( err => {
          if(err.statusText == "Unauthorized"){

          }

      })
 
  }
});




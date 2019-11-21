
const fullNameError = document.querySelector('.fullnameError');
const emailError = document.querySelector(".emailError");
const phoneError = document.querySelector(".phoneError");
const specializationError = document.querySelector(".specializationError");
const confirmPasswordError = document.querySelector(".departmentError")
const specialization = document.querySelector("#spcialization")
const department = document.querySelector("#department")
/*
 const addDepartment = (selectType,data)=>{
     for ( let value of data ) {
         const option = document.createElement('option')
         option.text = value.department;
         selectType.add(option)
     }
 }
 const addSpecialization = (selectType,data)=>{
    for ( let value of data ) {
        const option = document.createElement('option')
        option.text = value.specialization;
        selectType.add(option)
    }
}
*/
//---------- data from api ---------//
const specializationUrl = "https://virtual-healthcare.herokuapp.com/api/admin/doctors-registration-requirement";

axios.get(specializationUrl).then( response => {
    
    const data = response.data;
    for(let n of data){
        for(let m of n.departments){
            let option = document.createElement('option');
            let attr = document.createAttribute('value');
            option.text = m.department;
            attr.value = m.id;
            option.setAttributeNode(attr);
            department.add(option)
        }
    }
    for(let n of data){
        for(let m of n.specializations){
            let option = document.createElement('option')
            let attr = document.createAttribute('value');
            option.text = m.specialization;
            attr.value = m.id;
            option.setAttributeNode(attr);
            option.text = m.specialization;
            specialization.add(option)
        }
    }
  
}).catch(
    err => console.log("could'nt fetch data ", err)
    );

// ---- validating phone,email and password ----- //
const validatePhone = (input)=>{
    const regex = /[0-9]{10}/
    if(regex.test(input)) {
        return true;
    } else {
        return false;
    }
}
const validateEmail = (emailInput)=> {
    const regex = /@/;
    if(regex.test(emailInput)){
        return true;
    } else {
        return false;
    }
   }
   // ---- main form validation --------//
validateForm = (event)=>{
    event.preventDefault();
     let fullname = document.doctorLogin.fullname.value;
     let email = document.doctorLogin.email.value;
     let phone = document.doctorLogin.phone.value;
     let dataResponse = document.querySelector('.response');
     let errorCounter = 0;

   if(document.doctorLogin.fullname.value === "") {
      fullNameError.textContent = "Please Enter doctor's User Name";
      document.doctorLogin.fullname.classList.add('isInvalid');
      errorCounter++;
   }else {
       fullNameError.textContent = "";
       document.doctorLogin.fullname.classList.remove('isInvalid');
       name = fullname;
   };

   if(document.doctorLogin.email.value === ""){
       emailError.textContent = "Enter doctor's Email";
       document.doctorLogin.email.classList.add('isInvalid');
       errorCounter++;
   }else if(!validateEmail(document.doctorLogin.email.value)){
        emailError.textContent = "email invalid, Enter correct email eg. me@example.com";
        document.doctorLogin.email.classList.add('isInvalid');
        errorCounter++;
   }
   else{
       emailError.textContent = "";
       document.doctorLogin.email.classList.remove('isInvalid');
       email = email;
   };

   if(document.doctorLogin.phone.value === ""){
       phoneError.textContent = "Please Enter doctor's Phone Number";
       document.doctorLogin.phone.classList.add('isInvalid');
       errorCounter++;
   }  else if(isNaN(document.doctorLogin.phone.value)){
    phoneError.textContent = "invalid phone number, should be a number";
    document.doctorLogin.phone.classList.add('isInvalid');
    errorCounter++; 
   }else if(!validatePhone(document.doctorLogin.phone.value)){
    phoneError.textContent = "phone number should be greater 10 digits";
    document.doctorLogin.phone.classList.add('isInvalid');
    errorCounter++; 
   }else {
       phoneError.textContent = "";
       document.doctorLogin.phone.classList.remove('isInvalid');
       phone = phone;
   };
   
   if(errorCounter == 0) {
    const url = "https://virtual-healthcare.herokuapp.com/api/admin/registeradoctor";
     const data = {
         name : fullname,
         email : email,
         phone : phone,
         specialization:specialization.value,
         department:department.value
     }
    
     axios.post(url,data).then(response => {
         if(response.statusText === 'OK'){
             dataResponse.textContent = "Registration succussful"
             fullname = " ";
             email = " ";
             phone = " ";
             specialization =" ";
             department = " ";
         }
         console.log(response.message)
     }
     ).catch( (err) => {
        console.log(err)
     })
   }
 }
 
 document.doctorLogin.register.addEventListener('click',validateForm)
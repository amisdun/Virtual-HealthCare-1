
const fullNameError = document.querySelector('.fullnameError');
const emailError = document.querySelector(".emailError");
const phoneError = document.querySelector(".phoneError");
const specializationError = document.querySelector(".specializationError");
const confirmPasswordError = document.querySelector(".departmentError")
const specialization = document.querySelector("#spcialization")
const speOptions = document.querySelectorAll("#spcialization option")
const department = document.querySelector("#department")
const depOptions = document.querySelectorAll('#department option');

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

//---------- data from api ---------//
const departmentUrl = "https://virtual-healthcare.herokuapp.com/api/admin/department";

const specializationUrl = "https://virtual-healthcare.herokuapp.com/api/admin/specialization";

axios.get(specializationUrl).then( response => {
    
    const specializations = response.data.data;
    
    addSpecialization(specialization,specializations)

    console.log(specializations)

}).catch(err => console.log("could'nt fetch data ", err));

axios.get(departmentUrl).then( response => {

    let departments = response.data.data;

    addDepartment(department,departments)
    
}).catch(err => console.log("could'nt fetch data ", err)
);

for ( let options of depOptions){
    console.log(options);
}
//addDepAndSpe(specialization,specializations)
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
   let errorCounter = 0;

   if(document.doctorLogin.fullname.value === "") {
      fullNameError.textContent = "Please Enter doctor's User Name";
      document.doctorLogin.fullname.classList.add('isInvalid');
      errorCounter++;
   }else {
       fullNameError.textContent = "";
       document.doctorLogin.fullname.classList.remove('isInvalid')
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
   };
   //validating select 
 }
 
 document.doctorLogin.register.addEventListener('click',validateForm)
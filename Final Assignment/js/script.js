let display = document.getElementById("popupDiv");
let displayRegister = document.getElementById("Formcontainer");
let loginDiv = document.getElementById("popupChildMain");
let formObj = document.getElementById("formObj");

var logBtnName;
window.onclick = function (e) {

    if (e.target == display || e.target == displayRegister) {
        display.style.display = "none";
        displayRegister.style.display = 'none';

    }
}


var loginObj = new LoginObjMain();

function LoginObjMain() {
    this.login = login;
    this.closePopup = closePopup;
    this.register = register;

    function login() {
        var LoginLink = document.getElementById("LoginLink").innerHTML;

        if (LoginLink == "LOGOUT") {
            validate.alertDisplay("Logging out");
            setTimeout(function(){
			document.getElementById("LoginLink").innerHTML = "LOGIN";
            document.getElementById("RegisterLink").innerHTML = "REGISTER";
			document.getElementById("RegisterLink").style.color="white";
			},2500);
            

        }
        else {
            console.log("script");
            loginDiv.style.display = "block";
            display.style.display = 'block';
        }

    }
    function closePopup() {
       document.getElementById("Username").value="";
        document.getElementById("Password").value="";
        
        display.style.display = 'none';
        displayRegister.style.display = 'none';
        validate.resetForm();
    }

    function register() {
        var RegisterLink=document.getElementById("RegisterLink").innerHTML;
        if (RegisterLink=="REGISTER") {
            loginDiv.style.display = "none";
        displayRegister.style.display = 'block';
		
        }
        else{
            validate.alertDisplay("profile update still pending");
        }
        
    }

}

var validate = new ValidationFormMain();

let submitBtn = document.getElementById("submit");
let oninputValidate = document.getElementsByClassName("inpValid");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validate.validationForm();
})


// var validate = new ValidationFormMain();

function ValidationFormMain() {
    this.validationForm = validationForm;
    this.resetForm = resetForm;
    this.inputErrorDisplay = inputErrorDisplay;
    this.loginAuth=loginAuth;
	this.alertDisplay=alertDisplay;

    function validationForm() {
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let gender = document.querySelector('input[name="gender"]:checked');
        let mobile = document.getElementById("mobile").value;
        let dob = document.getElementById("dob").value;
        let age = document.getElementById("age").value;
        let city = document.getElementById("city").value;
        let addressArea = document.getElementById("addressArea").value;
        let checkboxes = document.querySelectorAll('input[name="Skills"]:checked');
		 let dateValidationResult = isValidDate(dob);
        // let dateValidationResult = isValidDate(dob);

        let pattern = /^[a-zA-Z]{1,15}$/;
        let num = /\d/;
        let count = /\d{10}$/;
        let ageCount = /\d{1,2}$/;
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        let address = /^.{2,250}$/;

        if (fname == "") {
            //firstnameError.innerHTML="Enter first name it is mandatory";
            alertDisplay("Enter first name it is mandatory");

        }
		else if (!fname.match(pattern))
		{
			alertDisplay("First name not contain numbers");
		}
        else if (lname == "") {
           
            alertDisplay("Last name is mandatory");
        }
		else if (!lname.match(pattern)) {
            
            alertDisplay("Last name not contain numbers");
        }

        else if (!gender) {
            alertDisplay("Please select a gender");
        }
        else if (dob == '') {
            alertDisplay("Enter date of-birth");
        }
		else if (!dobvalidate.test(dob)) {
                alertDisplay("Please enter a valid date of birth in the format dd/mm/yyyy");
        }
        else if (dateValidationResult === "invalidFormat") {
                alertDisplay("Please enter a valid date of birth ");
               
        }
        else if (dateValidationResult === "invalidDate") {
                alertDisplay("Please enter a valid date");
                
        }
        else if (dateValidationResult === "futureDate") {
                alertDisplay("Date of birth should be before the year 2024");
                
        }
        else if (mobile == "") {
            alertDisplay("Please enter mobile number");
        }
        else if (addressArea == "") {
            alertDisplay("Please enter address it is mandatory");
        }
        else if (!address.test(addressArea)) {
            alertDisplay("address Should be less than 250 characters");
        }
        else if (!count.test(mobile)) {
            alertDisplay("Enter 10 digit mobile no");
        }
        else if (pattern.test(mobile)) {
            alertDisplay("Mobile no not contain alphabets");
        }
		else if(age==""){
		    alertDisplay("Enter your age");
		}

        else if (!(age > 17 && age < 70)) {
            alertDisplay("Your age was not eligible for register");
        }
        else if (city == "") {
            alertDisplay("Please select city");
        }
        else if (checkboxes.length === 0) {
            document.getElementById("checkboxError").innerHTML = "Please select at least one skill";
        }

        else {
			resetForm();
            document.getElementById("alertBox").style.display = 'block';
            document.getElementById("alertBox").style.background = 'green';
            document.getElementById("msg").innerHTML = "Form submitted Successfully";
            document.getElementById("progressBar").style.animation = 'progress 3s 1 ease-in-out';
            setTimeout(function () {
                document.getElementById("alertBox").style.display = 'none';
            }, 3000);

            
        }
    }

    function isValidDate(dateString) {

        let datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

        if (!datePattern.test(dateString)) {
            return "invalidFormat";
        }

        let parts = dateString.split('/');
        let day = parseInt(parts[0]);
        let month = parseInt(parts[1]) - 1;
        let year = parseInt(parts[2]);

        let testDate = new Date(year, month, day);

        if (testDate.getFullYear() !== year || testDate.getMonth() !== month || testDate.getDate() !== day) {

            return "invalidDate";
        }

        if (year >= 2024) {
            return "futureDate";
        }

        calculateAge(day, month, year);
        return true;
    }


    function calculateAge(day, month, year) {
        let ageInp = document.getElementById("age");

        let currentDate = new Date();

        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();

        let age = currentYear - year;

        if (currentMonth < month || (currentMonth === month && currentDay < day)) {
            age--;
        }

        ageInp.value = age;
        // return age;
    }

    function alertDisplay(msg) {
        document.getElementById("alertBox").style.display = 'block';
        document.getElementById("alertBox").style.background = "linear-gradient(147deg, #990000 0%, #ff0000 74%)";
        document.getElementById("msg").innerHTML = msg;
        document.getElementById("progressBar").style.animation = 'progress 3s 1 ease-in-out';
        setTimeout(function () {
            document.getElementById("alertBox").style.display = 'none';
        }, 3000);

    }

    function resetForm() {
			let x=document.getElementById('formObj').reset();
		
         var errorDiv=document.querySelectorAll(".errorDiv");

		 errorDiv.forEach(function(item){
            item.innerHTML="&nbsp;";
		 });

		 var inpClear=document.querySelectorAll(".inpFormat");

         inpClear.forEach(function(item){
            item.value=" ";
		 });
		
    }

    function inputErrorDisplay(e) {
        let err = document.getElementById(e.name + "Error");
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        //let pattern=/^[a-zA-Z]{1,15}$/;
        if (e.id == "fname" || e.id == "lname") {
            if (e.value.match("[^a-zA-Z]")) {
                err.innerHTML = "Error Name Not Contain number";
				
            }

            else {
                err.innerHTML = "&nbsp;";
            }
        }
        else if (e.id == "dob") {
            let dateValidationResult = isValidDate(e.value);

            if (!dobvalidate.test(e.value)) {
                err.innerHTML = "Please enter a valid date of birth in the format dd/mm/yyyy";
            }
            else if (dateValidationResult === "invalidFormat") {
                err.innerHTML = "Please enter a valid date of birth ";
               
            }
            else if (dateValidationResult === "invalidDate") {
                err.innerHTML = "Please enter a valid date";
                
            }
            else if (dateValidationResult === "futureDate") {
                err.innerHTML = "Date of birth should be before the year 2024";
                
            }
            else {
                err.innerHTML = "&nbsp;";
            }

        }

    }

	 function loginAuth(btn) {
        var Username = "Gaurav";
        var password = 1234;
        var inpUsername = document.getElementById("Username").value;
        var inpPassword = document.getElementById("Password").value;
        var LoginLink = document.getElementById("LoginLink").innerHTML;

        console.log(inpUsername);
        console.log(inpPassword);
        if (Username == inpUsername && password == inpPassword) {
            loginObj.closePopup();
            document.getElementById("LoginLink").innerHTML = "LOGOUT";
            document.getElementById("RegisterLink").innerHTML ="welcome "+inpUsername;
            document.getElementById("RegisterLink").style.color="#2ec4b6";
        }
        else {
            alertDisplay("User not found Login again");
        }
    }

}


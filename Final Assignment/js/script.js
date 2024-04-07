let display = document.getElementById("popupDiv");
let displayRegister = document.getElementById("Formcontainer");
let loginDiv = document.getElementById("popupChildMain");
let formObj = document.getElementById("formObj");
var tablePage=document.getElementById("TablePage");

var logBtnName;
window.onclick = function (e) {

    if (e.target == display || e.target == displayRegister || e.target == tablePage) {
        display.style.display = "none";
        displayRegister.style.display = 'none';
        tablePage.style.display = 'none';
		validate.resetForm();
		document.getElementById("Username").value="";
        document.getElementById("Password").value="";

    }
}

var loginObj = new LoginObjMain();

function LoginObjMain() {
    this.login = login;
    this.closePopup = closePopup;
    this.register = register;
    this.displayTable=displayTable;

    function login() {
        var LoginLink = document.getElementById("LoginLink").innerHTML;

        if (LoginLink == "LOGOUT") {
            validate.alertDisplayLogout("Logging out");
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
        tablePage.style.display = 'none';
        validate.resetForm();
    }

    function register() {
        var RegisterLink=document.getElementById("RegisterLink").innerHTML;
        if (RegisterLink=="REGISTER") {
            loginDiv.style.display = "none";
            displayRegister.style.display = 'block';
		
        }
        else{
            loginObj.displayTable();
           // validate.alertDisplayLogout("profile update still pending");
        }
        
    }

    function displayTable() {
        
        tablePage.style.display="block";
        
    }

}

var validate = new ValidationFormMain();

let submitBtn = document.getElementById("submit");


submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    validate.validationForm();
})



let storedArray=[];

function ValidationFormMain() {
    this.validationForm = validationForm;
    this.resetForm = resetForm;
    this.inputErrorDisplay = inputErrorDisplay;
    this.loginAuth=loginAuth;
	this.alertDisplay=alertDisplay;
    this.alertDisplayLogout=alertDisplayLogout;
    this.checkPassword=checkPassword;
	

    function validationForm() {
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;

        let gender = document.querySelector('input[name="gender"]:checked');
        let mobile = document.getElementById("mobile").value;
        let dob = document.getElementById("dob").value;
        let age = document.getElementById("age").value;
		let email=document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("confirmPassword").value;
        let city = document.getElementById("city").value;
        let addressArea = document.getElementById("addressArea").value;
        let checkboxes = document.querySelectorAll('input[name="Skills"]:checked');

		let pincode = document.getElementById("pincode").value;
		 let dateValidationResult = isValidDate(dob);
        
        let pattern = /^[a-zA-Z]{2,15}$/;
        let num = /\d/;
        let count = /\d{10}$/;
        let ageCount = /\d{1,2}$/;
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        let address = /^.{2,250}$/;

        if (fname == "") {
            firstnameError.innerHTML="Enter first name it is mandatory";
            alertDisplay("Enter first name it is mandatory");

        }
		else if (!fname.match(pattern))
		{
			alertDisplay("First name not contain numbers");
		}
        else if (lname == "") {
            lastnameError.innerHTML="Enter last name it is mandatory";
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
        else if(!mobile.match("^[6-9][0-9]{8}")) {
            alertDisplay("Please enter proper mobile number");
        }
		else if(email==""){
		    alertDisplay("Please enter email id");
		}
		else if(!email.match("^[a-zA-Z]{2}[a-zA-Z0-9-.]*@[a-zA-Z0-9]+([.][a-zA-Z]+)+"))
		{
		    alertDisplay("Please enter proper email id");
		}
		else if(password==""||confirmPassword==""){
		   alertDisplay("Please enter password");
		}
        else if(!password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$")){
           alertDisplay("Password must contain at least 8 characters, one capital letter, one digit, and one special character");
        }
		else if(!checkPassword()){
		    alertDisplay("Passwords are not same, keep it same");
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
		else if(pincode==""){
		    alertDisplay("Please enter pincode");
		}
		else if(!pincode.match("^[1-9]{1}[0-9]{2}[0-9]{3}$")){
		    alertDisplay("Please enter correct pincode");
		}

        else if (checkboxes.length === 0) {
            document.getElementById("checkboxError").innerHTML = "Please select at least one skill";
        }

        else {
			
            document.getElementById("alertBox").style.display = 'block';
            document.getElementById("alertBox").style.background = 'green';
            document.getElementById("msg").innerHTML = "Form submitted Successfully";
            document.getElementById("progressBar").style.animation = 'progress 3s 1 ease-in-out';
            setTimeout(function () {
                document.getElementById("alertBox").style.display = 'none';
            }, 3000);
            // console.log("First: ",fname," Last: ",lname," gender: ",gender," dob: ",dob," age: ",age," mob: ",mobile," Email: ",email," Password : ",password ," Confirm: ",confirmPassword ," address: ",addressArea," city: ",city," pincode: ",pincode," Techinical: ",checkboxes );
            var selectedGender=gender.value;
            var box="";
            var selectedCheckboxValues = [];
           
             
            checkboxes.forEach(function(checkbox) {
               selectedCheckboxValues.push(checkbox.value);
             });
             var box=selectedCheckboxValues.join(", ");


            let storedObj={
                fname:fname,
                lname:lname,
                selectedGender:selectedGender,
                dob:dob,
                age:age,
                mobile:mobile,
                email:email,
                confirmPassword:confirmPassword,
                addressArea:addressArea,
                city:city,
                pincode:pincode,
                checkboxes:box
            };

            storedArray.push(storedObj);
          
           setTimeout( function(){loginObj.closePopup()},2500);
           setTimeout( function(){loginObj.displayTable()},2500);

           generateTable();
          
           resetForm();
           
           
                
        }
    }

    function generateTable() {

        var tbody = document.getElementById("Tablebody");
        
        tbody.innerHTML = "";

        storedArray.forEach(function(obj) {
            var row = document.createElement("tr");

            Object.keys(obj).forEach(function(key) {
                var cell = document.createElement("td");
                cell.textContent = obj[key];
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });
    }

   

    function isValidDate(dateString) {

        let datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

        if (!datePattern.test(dateString)) {
            return "invalidFormat";
        }

        let splited = dateString.split('/');
        let day = parseInt(splited[0]);
        let month = parseInt(splited[1]) - 1;
        let year = parseInt(splited[2]);

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

    function alertDisplayLogin(msg) {
        document.getElementById("alertBoxLogin").style.display = 'block';
        document.getElementById("alertBoxLogin").style.background = "linear-gradient(147deg, #990000 0%, #ff0000 74%)";
        document.getElementById("msglogin").innerHTML = msg;
        document.getElementById("progressBarLogin").style.animation = 'progress 3s 1 ease-in-out';
        setTimeout(function () {
            document.getElementById("alertBoxLogin").style.display = 'none';
        }, 3000);

    }

    function alertDisplayLogout(msg) {
        document.getElementById("alertBoxLogout").style.display = 'block';
        document.getElementById("alertBoxLogout").style.background = "linear-gradient(147deg, #990000 0%, #ff0000 74%)";
        document.getElementById("msglogout").innerHTML = msg;
        document.getElementById("progressBarlogout").style.animation = 'progress 3s 1 ease-in-out';
        setTimeout(function () {
            document.getElementById("alertBoxLogout").style.display = 'none';
        }, 3000);

    }




    function resetForm() {
			console.log("reset form");
            document.getElementById("fname").value="";
            document.getElementById("lname").value="";
          // document.getElementById("gender").value="";
            document.getElementById("dob").value="";
            document.getElementById("age").value="";
            document.getElementById("email").value="";
            document.getElementById("confirmPassword").value="";
            document.getElementById("password").value="";
            document.getElementById("pincode").value="";
            document.getElementById("city").value="";
            document.getElementById("addressArea").value="";
            document.getElementById("mobile").value="";
           // document.querySelectorAll('input[name="Skills"]:checked')
            
           var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
    });
    var errorDiv=document.querySelectorAll(".errorDiv");

    errorDiv.forEach(function(item){
       item.innerHTML="&nbsp;";
    });
      
		
    }

	
    
    function inputErrorDisplay(e) {

        let err = document.getElementById(e.name + "Error");
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        //let pattern=/^[a-zA-Z]{1,15}$/;

		//console.log("e",keyCode);

        if (e.id == "fname") {
            if (e.value.match("[^a-zA-Z]{2,15}$")) {
                err.innerHTML = "Error: Name should not contain numbers or spaces";
            } else if (
                (event.keyCode >= 48 && event.keyCode <= 57) || 
                (event.keyCode >= 33 && event.keyCode <= 47) || 
                (event.keyCode >= 58 && event.keyCode <= 64) ||
                (event.keyCode >= 91 && event.keyCode <= 96) ||
                (event.keyCode >= 123 && event.keyCode <= 126) || 
                (event.keyCode >= 96 && event.keyCode <= 105)||
                event.keyCode == 32 )
             {
                event.preventDefault();
                err.innerHTML = "Error: Name should not contain numbers or spaces";
            } else if (event.target.value.length > 15 && event.keyCode !== 8) {
                event.preventDefault();
                err.innerHTML = "Error: Exceeds the limit enter up to 15 characters";
            } else {
                err.innerHTML = "&nbsp;";
            }
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });
        }
        else if(e.id == "lname"){
            if (e.value.match("[^a-zA-Z]{2,15}$")) {
                err.innerHTML = "Error: Last Name should not contain numbers or spaces";
            } else if (
                (event.keyCode >= 48 && event.keyCode <= 57) || 
                (event.keyCode >= 33 && event.keyCode <= 47) || 
                (event.keyCode >= 58 && event.keyCode <= 64) ||
                (event.keyCode >= 91 && event.keyCode <= 96) ||
                (event.keyCode >= 123 && event.keyCode <= 126) || 
                (event.keyCode >= 96 && event.keyCode <= 105)||
                event.keyCode == 32 )
             {
                event.preventDefault();
                err.innerHTML = "Error: Last Name should not contain numbers or spaces";
            } else if (event.target.value.length > 15 && event.keyCode !== 8) {
                event.preventDefault();
                err.innerHTML = "Error: Exceeds the limit enter up to 15 characters";
            } else {
                err.innerHTML = "&nbsp;";
            }
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });

        }
        
        
        else if (e.id == "dob") {
            let dateValidationResult = isValidDate(e.value);
            let dobdate=document.getElementById(e.id);

            
            if (/[a-zA-Z]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z]/g, ''); 
                err.innerHTML = "Please enter numbers only";
                return;
            }

          
              else  if (!dobvalidate.test(e.value)) {
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
                e.addEventListener("paste", function(event) {
                
                    event.preventDefault();
                    err.innerHTML = "Error: Pasting is not allowed";
                });
                

        }
		else if(e.id=="mobile"){
			if((event.keyCode >=65 && event.keyCode<= 90) || (event.keyCode >= 97 && event.keyCode <=122 ) ||(event.keyCode==32)
				|| (event.keyCode > 31) && (event.keyCode < 48 || event.keyCode > 57))
				{
                 event.preventDefault();
				err.innerHTML ="Mobile number contain only numbers";
			
			}
			else if(!e.value.match("^[6-9][0-9]{8}")){
				
			    err.innerHTML ="Enter proper mobile number";
				
			}
			
			else{
			 err.innerHTML = "&nbsp;";
			}
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });
		
		}
		else if(e.id=="email"){
           // let emailValidREgexp=/(^[a-zA-Z]{2}[a-zA-Z0-9-.]*@[a-z]+([.][a-zA-Z]{2}))/;
           let validEmailid=/(^[a-z][a-z0-9\.]+[@][a-z]+[.][a-z]{2})/g;

           let email_id = document.getElementById(e.id);
           if (event.keyCode==32) {
            event.preventDefault();

           }

           email_id.addEventListener("input",()=>{
            if(email==" "){
                err.innerHTML ="Email id can not contain space";
            }
           else  if(!e.value.match(validEmailid)){
               
			   err.innerHTML ="Enter proper Email id";
			}

			else{
			 err.innerHTML = "&nbsp;";
			}
           });
           e.addEventListener("paste", function(event) {
                
            event.preventDefault();
            err.innerHTML = "Error: Pasting is not allowed";
        });
            
		
		}
        else if(e.id=="age"){
            if (/[a-zA-Z]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z]/g, ''); 
                err.innerHTML = "Please enter numbers only";
                return;
            }

        }
		else if(e.id=="password"){
            if (e.value.length > 15) {
                e.value = e.value.substring(0, 15); 
                err.innerHTML = "Password can only contain 15 characters";
                return;
            }
            if (!e.value.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,15}$")) {
                err.innerHTML = "Password must contain at least 8 to 15characters,one capital letter,one digit,and one special character";
            }
           
            else {
                err.innerHTML = "&nbsp;";
            }
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });
		}
		else if(e.id=="confirmPassword"){
		    if(!checkPassword()){

			  err.innerHTML = "Password mismatch";
			}
			else{
			err.innerHTML = "&nbsp;";
			}
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });
		}
		else if(e.id=="pincode"){
			if (/[a-zA-Z]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z]/g, ''); 
                err.innerHTML = "Please enter numbers only";
                return;
            }
            if (e.value.length > 6) {
                e.value = e.value.substring(0, 6); 
                err.innerHTML = "Pincode can only contain 6 numbers";
                return;
            }

		  else if(!e.value.match("^[1-9]{1}[0-9]{2}[0-9]{3}$")){
		   err.innerHTML = "Enter correct pincode";
		   }
		  
		   else{
		   err.innerHTML = "&nbsp;";
		   }
           e.addEventListener("paste", function(event) {
                
            event.preventDefault();
            err.innerHTML = "Error: Pasting is not allowed";
        });
		}

    }

	function checkPassword(){
	      let password = document.getElementById("password").value;
		 let confirmPassword = document.getElementById("confirmPassword").value;
		 if(password==confirmPassword){
		    return true;
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
		else if(inpUsername=="" || inpPassword==""){
            alertDisplayLogin("Please enter user name and password");
		}
        else {
            alertDisplayLogin("User not found Login again");
        }
    }

}

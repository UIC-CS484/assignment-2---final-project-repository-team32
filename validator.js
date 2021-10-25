let blacklistedPasswords = ["Password123","Passw0rd"];

function passwordValidator(pswd) {
  
    let msg = "valid";
    let isValid = false;
    
    if(/\s/.test(pswd)) {
        msg = "password may not contain spaces"
    } else if (!(/\d/.test(pswd))) {
        msg = "password must contain a digit";
    } else if ( !(/[a-zA-Z]/.test(pswd)) ) {
        msg = "password must contain a letter";
    } else if (pswd.length < 8) {
        msg = "password must have length greater than 8";
    } else if (pswd.toLowerCase() === pswd) {
        msg = "password needs uppercase letters";
    } else if (pswd.toUpperCase() === pswd) {
        msg = "password needs uppercase letters";
    } else if(blacklistedPasswords.indexOf(pswd) > -1) {
        msg = `password \"${pswd}\" blacklisted`
    } else {
        isValid=true;
    }
  
    return {
      "message": msg,
      "isValid": isValid
    }
  }

module.exports = passwordValidator
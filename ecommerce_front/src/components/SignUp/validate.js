const regexName = /^[a-zA-Z\s]{6,30}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^.{6,20}$/;
const regexPasswordWeak = /^[a-zA-Z0-9]{6,}$/;
const regexPasswordModerate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexPasswordStrong = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateInput = (form, errors, setErrors) => {
  const {name, email, password} = form;
  let validated = true;

  if(!regexName.test(name.trim()) && name.length !== 0){
    errors = { ...errors, name: "Invalid name, only letters, between 6 and 30 characters." };
    setErrors(errors);
    validated = false;
  } else{
    errors = { ...errors, name: '' };
    setErrors(errors);
  }

  if(!regexEmail.test(email) && email.length !== 0){
    errors = { ...errors, email: "Invalid email." };
    setErrors(errors);
    validated = false;
  } else{
    errors = { ...errors, email: '' };
    setErrors(errors);
  }

  if(!regexPassword.test(password) && password.length !== 0){
    errors = { ...errors, password: "Between 6 and 20 characters." };
    setErrors(errors);
    validated = false;
  } else{
    errors = { ...errors, password: '' };
    setErrors(errors);
  }
}

export const validateForm = (form, errors) => {
    return !hasEmptyProperty(form) && hasAllEmptyProperty(errors);
};

// if ((!(/^[a-zA-Z0-9\s]+$/.test(form.name)) && form.name.length !== 0) || (form.name.length < 4 && form.name.length > 0) || (form.name.length > 25)) {
//     errors = { ...errors, name: 'Invalid name, must be between 4 and 25 letters, no special characters.' };
//     setErrors(errors);
//     validated = false;
// } else {
//     errors = { ...errors, name: '' };
//     setErrors(errors);
// }

function hasEmptyProperty(obj) {
  for (let key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
          return true;
      }
      if (obj[key] === "") {
          return true;
      }
  }
  return false;
}

function hasAllEmptyProperty(obj) {
  for (let key in obj) {
      if (obj[key] !== "") {
          return false;
      }
  }
  return true;
}

export const passwordDifficulty = (password) => { 
  if(regexPasswordStrong.test(password) && password.length>5 && password.length<21){
    return 'strong';
  }else if(regexPasswordModerate.test(password) && password.length>5 && password.length<21){
    return 'medium';
  } else if(regexPasswordWeak.test(password) && password.length>5 && password.length<21){
    return 'weak';
  } else{
    return '';
  }
}
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateInputEmail = (user, error, setError) => {
  const {email} = user;
  const validated = true;

  if(!regexEmail.test(email) && email.length !== 0){
    error = "Invalid email.";
    setError(error);
    validated = false;
  } else{
    error = '';
    setError(error);
  }

  return validated;
};

export const validateForm = (user,error) => {
  const {email,password} = user;

  if(email.length === 0 || password.length === 0 || error.length === 0){
    return false;
  } else{
    return true;
  }
}
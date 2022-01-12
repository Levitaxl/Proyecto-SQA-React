export default function validateInfo(values) {
  let errors = {};
  const is_ucabista = document.getElementById('is_ucabista').checked;
  if (!values.first_name.trim()) {
    errors.first_name = 'first_name required';
  }

  if (!values.last_name.trim()) {
    errors.last_name = 'last_name required';
  }

  if (!values.username.trim()) {
    errors.username = 'username required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email address is invalid';
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.password2) {
    errors.password2 = 'Password is required';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }

  
  if(is_ucabista==true && /\S+@\S+\.\S+/.test(values.email)){
    if(!values.email.includes('ucab.edu.ve')){
      errors.email = 'Ingrese un correo ucab valido';
    }
  }
  return errors;
}

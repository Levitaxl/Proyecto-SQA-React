import { useState, useEffect } from 'react';
import axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    first_name: '',
    email: '',
    password: '',
    password2: '',
    last_name:'',
    is_ucabista:false,
    username:''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    console.log(values)
    console.log(errors);
    const is_ucabista = document.getElementById('is_ucabista').checked;
    values['is_ucabista']=is_ucabista;
    if(isEmpty(errors)) {
      axios.post(`http://127.0.0.1:8000/api/auth/register/`, values)
       .then(res => {
         console.log(res)
        if(res['data']['created']==false){
          if(res['data']['errors'][0]=="El nombre de User ya se encuentra registrado")document.getElementById('username-has-already-been-taken-error').style.display = 'block';
          else document.getElementById('username-has-already-been-taken-error').style.display = 'none';
         
          if(res['data']['errors'][0]=='El email de usuario ya se encuentra registrado')document.getElementById('email-has-already-been-taken-error').style.display = 'block';
          else document.getElementById('email-has-already-been-taken-error').style.display = 'none';
        }
        else{
          alert('Usuario Registrado Exitosamente');
          window.location.href = "/login";
        } 

      })
       .catch(err => console.log('Login: ', err));
    }
  };

  function isEmpty(value){
    var isEmptyObject = function(a) {
      if (typeof a.length === 'undefined') { // it's an Object, not an Array
        var hasNonempty = Object.keys(a).some(function nonEmpty(element){
          return !isEmpty(a[element]);
        });
        return hasNonempty ? false : isEmptyObject(Object.keys(a));
      }
  
      return !a.some(function nonEmpty(element) { // check if array is really not empty as JS thinks
        return !isEmpty(element); // at least one element should be non-empty
      });
    };
    return (
      value == false
      || typeof value === 'undefined'
      || value == null
      || (typeof value === 'object' && isEmptyObject(value))
    );
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;

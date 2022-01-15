import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-2.svg' alt='spaceship' />
        </div>
          <FormSignup submitForm={submitForm} />
      </div>
    </>
  );
};

export default Register;

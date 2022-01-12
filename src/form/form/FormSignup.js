import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
  
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );


  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Registro
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>UserName</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your UserName'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Nombres</label>
          <input
            className='form-input'
            type='text'
            name='first_name'
            placeholder='Enter your first_name'
            value={values.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p>{errors.first_name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Apellidos</label>
          <input
            className='form-input'
            type='text'
            name='last_name'
            placeholder='Enter your last_name'
            value={values.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p>{errors.last_name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Soy Ucabista</label>
          <input
            className='checkbox'
            type='checkbox'
            name='is_ucabista'
            placeholder='Eres ucabista?'
            value={values.is_ucabista}
            onChange={handleChange}
            id='is_ucabista'
          />
          {errors.is_ucabista && <p>{errors.is_ucabista}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='#'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;

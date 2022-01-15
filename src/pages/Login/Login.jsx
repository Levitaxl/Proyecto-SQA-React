import styled from "styled-components";
import {mobile} from "../../components/tiendas/responsive";
import { useState,useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Redirect } from "react-router-dom";



const Login = () => {

  const [data,setData] =useState({})

  const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

function handleSubmitLogin (e){
  e.preventDefault();
  let email           = document.getElementById("email").value;
  let password        = document.getElementById("password").value;
  let fail=false;

  

  if(email == 0) {
    document.getElementById('email-error').style.display = 'block';
    fail=true;
  }
  else  {
    document.getElementById('email-error').style.display = 'none'
    if(pruebaemail(email)==0) {
      document.getElementById('email-structure-error').style.display = 'block'
      fail=true;
    }
    else document.getElementById('email-structure-error').style.display = 'none'
  };

  
  if(password == 0) {
    document.getElementById('password-error').style.display = 'block';
    fail=true;
  }
  else  document.getElementById('password-error').style.display = 'none';

  if(fail==false){
    const url='http://127.0.0.1:8000/api/auth/login';
    const body ={email,password};
    axios.post(url, body)
     .then(res => {
      console.log(res)
       if(res['data']['login']==true){
          let user =res['data'];
          if(user['is_ucabista'] || user['is_ucabista']){
            alert('usuario logeado')
            window.localStorage.setItem('loggedNotAppUser', JSON.stringify(user))
            window.location.href = "/home";
          }
          else if(user['is_dueño']){
            alert('usuario logeado')
            window.localStorage.setItem('loggedNotAppUserDueno', JSON.stringify(user))
          }
          else{
            window.localStorage.setItem('loggedNotAppUserAdmin', JSON.stringify(user))
            window.location.href = "/admin/index";
            
          }
         
         
       }
       else alert('El correo con la clave no se encuentra en el sistema')

    })
     .catch(err => console.log('Login: ', err));
  }
}

function pruebaemail (valor){
  const re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  if(!re.exec(valor)){
    return 0
  }
  else return 1
}

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmitLogin} >
          <Input
            type='text'
            name='email'
            placeholder='Enter your email'
            id="email"
          />
            <p id="email-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
            <p id="email-structure-error" className="text-danger" style={{display:'none'}}>Ingrese la estructura de un correo valida </p>
            <Input
              type='password'
              name='password'
              placeholder='Enter your password'
              id="password"
          />
            <p id="password-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
            
          <Button>LOGIN</Button>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

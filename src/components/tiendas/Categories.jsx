import styled from "styled-components";
import { mobile } from "./responsive";
import CategoryItem from "./CategoryItem";
import { useState,useEffect } from "react";
import axios from 'axios';


export default function Categories() {

  const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
  `;

  const [data,setData] =useState([]);

  const getTiendas= async() =>{
    const user = JSON.parse(window.localStorage.getItem('loggedNotAppUser'));
    const token= user['access_token'];
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const url='http://127.0.0.1:8000/api/auth/tienda';
    axios.get(url, config)
    .then(res => {
      setData(res['data']);
    })
    .catch(err => console.log('Login: ', err));
  }


  useEffect(()=>{
  getTiendas()
  },[])


  return (
    <Container>
      {data.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );


}

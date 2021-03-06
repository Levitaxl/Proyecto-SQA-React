import styled from "styled-components";
import Product from "./Product";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { Link } from "react-router-dom";


export default function Products (productList) { 


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


let { tiendaId } = useParams();

const [data,setData] =useState([]);

const getProductosByTiendaId= async(tiendaId) =>{
  const user = JSON.parse(window.localStorage.getItem('loggedNotAppUser'));
  const token= user['access_token'];
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const url=`http://127.0.0.1:8000/api/auth/productos/tienda/`+tiendaId;
  axios.get(url, config)
  .then(res => {
    setData(res['data']['productos']);
  })
  .catch(err => console.log('Login: ', err));
}


useEffect(()=>{
  getProductosByTiendaId(tiendaId)
},[])

  return (
    <Container>
      {data.map((item) => (
        
          <Product item={item} key={item.id} />
      ))}
    </Container>
  );


};

import styled from "styled-components";
import Navbar from "./../../components/tiendas/Navbar";
import Products from "./../../components/tiendas/Products";
import { mobile } from "./../../components/tiendas/responsive";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';


export default function  ProductList () {



const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

  let { tiendaId } = useParams();

  const [data,setData] =useState([]);

  const getProductosByTiendaId= async(tiendaId) =>{
    const user = JSON.parse(window.localStorage.getItem('loggedNotAppUser'));
    const token= user['access_token'];
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const url=`http://127.0.0.1:8000/api/auth/tienda/`+tiendaId;
    axios.get(url, config)
    .then(res => {
      setData(res['data']['tienda']);
    })
    .catch(err => console.log('Login: ', err));
  }


  useEffect(()=>{
    getProductosByTiendaId(tiendaId)
  },[])




  return (
    <Container>
      <Navbar />
      <Title>Tienda: {data['titulo']}</Title>
      <Products/>
    </Container>
  );
};

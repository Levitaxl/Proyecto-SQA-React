import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState,useEffect } from "react";
import { useParams } from "react-router";


export default function Products () {

  let { tiendaId } = useParams();

  const [data,setData] =useState([]);

  const getProductosByTiendaId= async(tiendaId) =>{
    const url=`http://127.0.0.1:8000/api/productos/tienda/`+tiendaId;
    const resp= await fetch(url);
    const data= await resp.json();
    console.log(data);
    setData(data);
  }


  useEffect(()=>{
    getProductosByTiendaId(tiendaId)
  },[])




const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


  return (
    <Container>
      {data.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );


};

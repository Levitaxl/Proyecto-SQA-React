import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useState,useEffect } from "react";


export default function Categories() {

  const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
  `;

  const [data,setData] =useState([]);

  const getTiendas= async() =>{
    let user = window.localStorage.getItem('loggedNotAppUser');
    if (user!= null) user=JSON.parse(user);
    console.log(user)
    const url=`http://127.0.0.1:8000/api/getAllTiendas/`+user['token'];
    const resp= await fetch(url);
    
    const data= await resp.json();
    console.log(data);
    setData(data);
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

import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../../../components/tiendas/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../../../components/tiendas/responsive";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {

  let { productId } = useParams();
  const [data,setData] =useState({})

  const getProducto= async(tiendaId) =>{
    const url=`http://127.0.0.1:8000/api/auth/producto/`+productId;


    const user = JSON.parse(window.localStorage.getItem('loggedNotAppUser'));
    const token= user['access_token'];

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

     
    axios.get(url,config)
     .then(res => {
        let data= res['data'];
        data.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+data.ruta_imagen_principal
        if(data.estado_publicado==0)data.estado_publicado='No publicado';
        else data.estado_publicado='Publicado';
        setData(data);
      
    })
     .catch(err => console.log('Login: ', err));
   
  }


  useEffect(()=>{
    getProducto(productId)
  },[])


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={data.ruta_imagen_principal} />
        </ImgContainer>
        <InfoContainer>
          <Title>{data.titulo}</Title>
          <Desc>
            {data.descripcion}
          </Desc>
          <Price>$ {data.cantidad}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>{data.cantidad}</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;

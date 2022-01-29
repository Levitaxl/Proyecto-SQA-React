
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../../../components/tiendas/Navbar";
import { useState,useEffect } from "react";
import axios from 'axios';
import { DeleteOutline } from "@material-ui/icons";
import './Cart.css'
import { isUnitless } from "@mui/material/styles/cssUtils";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 100vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const [data,setData] =useState([])

  const getProducto= async() =>{
    let user = window.localStorage.getItem('loggedNotAppUser');
    user=JSON.parse(user);
    const userid=user.user.id
    const url=`http://127.0.0.1:8000/api/auth/carro/getByUserId/`+userid;
  
  
    const token= user['access_token'];
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    axios.get(url,config)
     .then(res => {
       console.log(res['data']['productos'])
       setData(res['data']['productos']);
      
    })
     .catch(err => console.log('Login: ', err));
  }

  
  const handleDelete= async(productId) =>{
    let user = window.localStorage.getItem('loggedNotAppUser');
    user=JSON.parse(user);
    const userid=user.user.id
    const url=`http://127.0.0.1:8000/api/auth/carro/remove`;
  
  
    const token= user['access_token'];
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    var datos = new FormData(); 
    datos.append('usuario_id', userid);
    datos.append('producto_id', productId);
  
    axios.post(url,datos,config)
    .then(res => {
      alert('Producto retirado exitosamente del carrito')
       console.log(res)
       setData(res['data']['productos']);
    })
     .catch(err => console.log('Login: ', err));
  }
  useEffect(()=>{
    getProducto()
  },[])

  function checkBoxPaypal(){
    document.getElementById('checkbox-pm').checked=false;
    document.getElementById('checkbox-efectivo').checked=false;
    document.getElementById('block-paypal').style.display = 'block';
    document.getElementById('block-pm').style.display = 'none';
    document.getElementById('block-efectivo').style.display = 'none';
  }

  function checkBoxPm(){
    document.getElementById('checkbox-paypal').checked=false;
    document.getElementById('checkbox-efectivo').checked=false;
    document.getElementById('block-paypal').style.display = 'none';
   document.getElementById('block-pm').style.display = 'block';
   document.getElementById('block-efectivo').style.display = 'none';
   }

   function checkBoxEfectivo(){
    document.getElementById('checkbox-pm').checked=false;
    document.getElementById('checkbox-paypal').checked=false;
    document.getElementById('block-paypal').style.display = 'none';
   document.getElementById('block-pm').style.display = 'none';
   document.getElementById('block-efectivo').style.display = 'block';
   }

   function save(){
    let user = window.localStorage.getItem('loggedNotAppUser');
    user=JSON.parse(user);
    const userid=user.user.id
    const url=`http://127.0.0.1:8000/api/auth/pedido/`;
  
  
    const token= user['access_token'];
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const is_pago_movil = document.getElementById('checkbox-pm').checked;
    const is_paypal     = document.getElementById('checkbox-paypal').checked;
    const is_efectivo   = document.getElementById('checkbox-efectivo').checked;
    const imagen_pago_movil = document.getElementById("imagen-pago-movil").files[0];
    const imagen_efectivo = document.getElementById("imagen-pago-efectivo").files[0];
    const correo_paypal = document.getElementById("correo-paypal").value;
    const descripcion = document.getElementById("descripcion").value;
    const nombre = document.getElementById("nombre").value;

    var datos = new FormData(); 
    datos.append('usuario_id', userid);
    datos.append('is_paypal', is_paypal);
    datos.append('is_pago_movil', is_pago_movil);
    datos.append('is_efectivo', is_efectivo);
    datos.append('descripcion',descripcion);
    datos.append('nombre',nombre);

    if(is_efectivo==true)    datos.append('imagen_efectivo', imagen_efectivo);
    if(is_pago_movil==true)  datos.append('imagen_pago_movil', imagen_pago_movil);
    if(is_paypal==true)      datos.append('correo_paypal',correo_paypal);


 
    axios.post(url,datos,config)
     .then(res => {
      console.log(res)
    })
     .catch(err => console.log('Login: ', err));



   }

  
  return (
    <Container>
    <Navbar />
      <Wrapper>
        <Bottom>
          <Info>
          {data.map((item) => (
            <Product>
            <ProductDetail>
              <Image src={"http://127.0.0.1:8000/uploads/"+item[0]['ruta_imagen_principal']}   />
              <Details>
                <ProductName>
                  <b>Product:</b> {item[0]['titulo']}
                </ProductName>
                <ProductId>
                  <b>ID:</b> {item[0]['id']}
                </ProductId>
                <ProductId>
                  <b>Descripcion:</b> {item[0]['descripcion']}
                </ProductId>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountContainer>
                <ProductAmount>{item[0]['cantidad']}</ProductAmount>
                
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(item[0]['id'])}
              />
 
              </ProductAmountContainer>
              <ProductPrice>$ {item[0]['cantidad']}</ProductPrice>
            </PriceDetail>
          </Product>
          ))}
            
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="pago">
              <SummaryItemText>Metodo de Pago</SummaryItemText>
              <div>
              Paypal:     <input id="checkbox-paypal" type="checkbox" onClick={checkBoxPaypal}/>
              <br></br>
              Pago Movil: <input id="checkbox-pm" type="checkbox" onClick={checkBoxPm}/>
              <br></br>
              Efectivo:   <input id="checkbox-efectivo" type="checkbox" onClick={checkBoxEfectivo}/>
            </div>

            </SummaryItem>  
            <SummaryItem style={{display:'none'}} id='block-paypal'>
            <div>              
              <h1>Pago de Paypal</h1>
              Ingrese el correo: <input name="isGoing" type="text" id='correo-paypal' />
              </div>
            </SummaryItem>

            <SummaryItem style={{display:'none'}}  id='block-pm'>
            <div>              
              <h1>Pago Movil</h1>
              Ingrese la imagen de la transaccion: <input name="isGoing" type="file" id='imagen-pago-movil'/>
              </div>
            </SummaryItem>

            <SummaryItem style={{display:'none'}} id='block-efectivo'>
            <div>              
              <h1>Pago Efectivo</h1>
              Ingrese la imagen del efectivo: <input name="isGoing" type="file" id='imagen-pago-efectivo' />
              </div>
            </SummaryItem>

            <SummaryItem>
            <div>              
              <h1>Descripcion</h1>
              <input name="isGoing" type="text" style={{width:'300px'}} id='descripcion' />
              </div>
            </SummaryItem>

            <SummaryItem>
            <div>              
              <h1>Nombre</h1>
              <input name="isGoing" type="text" style={{width:'300px'}} id='nombre' />
              </div>
            </SummaryItem>


            <Button onClick={save}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import "./producto.css";
import axios from 'axios';

export default function Producto() {
  let { productoId } = useParams();
  const [data,setData] =useState({})

  const getProducto= async(tiendaId) =>{
    const url=`http://127.0.0.1:8000/api/auth/producto/`+productoId;


    const user = JSON.parse(window.localStorage.getItem('loggedNotAppUserAdmin'));
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
    getProducto(productoId)
  },[])

  function handleSubmitProducto(e){
    e.preventDefault();
    let titulo                  = document.getElementById("titulo").value;
    let imagen_producto         = document.getElementById("imagen_producto").files[0];
    let cantidad                = document.getElementById("cantidad").value;
    let estado_publicado        = document.getElementById("estado_publicado").value;
    let descripcion             = document.getElementById("descripcion").value;
    let fail=false;

    if(titulo == 0) {
      document.getElementById('titulo-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('titulo-error').style.display = 'none';

    if(cantidad == 0) {
      document.getElementById('cantidad-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('cantidad-error').style.display = 'none';
    
    if(estado_publicado == 0) {
      document.getElementById('estado_publicado-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('estado_publicado-error').style.display = 'none';


    if(descripcion == 0) {
      document.getElementById('descripcion-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('descripcion-error').style.display = 'none';


    
    if(fail==false){

      var datos = new FormData(); 
      datos.append('titulo', titulo);
      datos.append('imagen_producto', imagen_producto);
      datos.append('cantidad', cantidad); 
      datos.append('estado_publicado', estado_publicado);
      datos.append('descripcion', descripcion);


      const user = JSON.parse(window.localStorage.getItem('loggedNotAppUserAdmin'));
      const token= user['access_token'];

      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
              
      axios.post(`http://127.0.0.1:8000/api/auth/producto/`+data.id, datos,config)
       .then(res => {
          let producto= res['data']['producto'];
          producto.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+producto.ruta_imagen_principal
          if(producto.estado_publicado==0)producto.estado_publicado='No publicado';
          else producto.estado_publicado='Publicado';
          setData(producto);
      })
       .catch(err => console.log('Login: ', err));
    }
  }




  return (
    <div className="producto">
      <div className="productoTitleContainer">
        <h1 className="productoTitle">Producto</h1>
      </div>
      <div className="productoContainer">
        <div className="productoShow">
          <div className="productoShowTop">
            <div className="productoShowTopTitle">
              <span className="productoShowproductoname">{data.titulo}</span>
            </div>
          </div>
          <div className="productoShowBottom">
            <div className="productoShowInfo">
              <span className="productoShowInfoTitle">Cantidad: {data.cantidad}</span>
            </div>
            <div className="productoShowInfo">
              <span className="productoShowInfoTitle">Estado Publicado: {data.estado_publicado}</span>
            </div>
            <div className="productoShowInfo">
              <span className="productoShowInfoTitle">Descripcion: {data.descripcion}</span>
            </div>
          </div>
        </div>
        <div className="productoUpdate">
          <span className="productoUpdateTitle">Edit</span>
          <form className="productoUpdateForm" onSubmit={handleSubmitProducto}>
            <div className="productoUpdateLeft">
              <div className="productoUpdateItem">
                <label>titulo</label>
                <input
                  type="text"
                  placeholder={data.titulo}
                  className="productoUpdateInput"
                  id='titulo'
                />
                 <p id="titulo-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="productoUpdateItem">
                <label>cantidad</label>
                <input
                  type="number"
                  placeholder={data.cantidad}
                  className="productoUpdateInput"
                  id='cantidad'
                />
                 <p id="cantidad-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="productoUpdateItem">
                <label>estado_publicado</label>
                <input
                  type="text"
                  placeholder={data.estado_publicado}
                  className="productoUpdateInput"
                  id='estado_publicado'
                />
                 <p id="estado_publicado-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="productoUpdateItem">
                <label>descripcion</label>
                <input
                  type="text"
                  placeholder= {data.descripcion}
                  className="productoUpdateInput"
                  id='descripcion'
                />
                 <p id="descripcion-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div> 

              <div className="tiendaUpdateItem">
                <label>Imagen Del Producto</label>
                <input
                  type="file"
                  className="tiendaUpdateInput"
                  id='imagen_producto'
                />
                 <p id="imagen_producto-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
        
              </div>

              <div className="productoUpdateItem">
                <button className="productoUpdateButton">Update</button>
                </div>
            </div>
            <div className="productoUpdateRight">
              <div className="productoUpdateUpload">
                <img
                  className="productoUpdateImg"
                  src={data.ruta_imagen_principal}
                  alt=""
                />
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

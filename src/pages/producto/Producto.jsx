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

export default function Producto() {
  let { productoId } = useParams();
  const [data,setData] =useState({})

  const getProducto= async(tiendaId) =>{
    const url=`http://127.0.0.1:8000/api/producto/`+productoId;
    const resp= await fetch(url);
    let data= await resp.json();
    data.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+data.ruta_imagen_principal
    setData(data);
  }


  useEffect(()=>{
    getProducto(productoId)
  },[])



  return (
    <div className="producto">
      <div className="productoTitleContainer">
        <h1 className="productoTitle">Producto</h1>
        <Link to="/newproducto">
          <button className="productoAddButton">Create</button>
        </Link>
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
              <PermIdentity className="productoShowIcon" />
              <span className="productoShowInfoTitle">Cantidad: {data.cantidad}</span>
            </div>
            <div className="productoShowInfo">
              <CalendarToday className="productoShowIcon" />
              <span className="productoShowInfoTitle">estado_publicado: {data.estado_publicado}</span>
            </div>
            <div className="productoShowInfo">
              <PhoneAndroid className="productoShowIcon" />
              <span className="productoShowInfoTitle">Descripcion: {data.descripcion}</span>
            </div>
          </div>
        </div>
        <div className="productoUpdate">
          <span className="productoUpdateTitle">Edit</span>
          <form className="productoUpdateForm">
            <div className="productoUpdateLeft">
              <div className="productoUpdateItem">
                <label>titulo</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="productoUpdateInput"
                />
              </div>
              <div className="productoUpdateItem">
                <label>cantidad</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="productoUpdateInput"
                />
              </div>
              <div className="productoUpdateItem">
                <label>estado_publicado</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="productoUpdateInput"
                />
              </div>
              <div className="productoUpdateItem">
                <label>descripcion</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="productoUpdateInput"
                />
              </div>
            </div>
            <div className="productoUpdateRight">
              <div className="productoUpdateUpload">
                <img
                  className="productoUpdateImg"
                  src={data.ruta_imagen_principal}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="productoUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="productoUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";

export default function User() {


  let { userId } = useParams();
  const [data,setData] =useState({})

  const getTienda= async(userId) =>{
  const user = JSON.parse(window.localStorage.getItem('loggedNotAppUserAdmin'));
  const token= user['access_token'];
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const url=`http://127.0.0.1:8000/api/auth/usuario/`+userId;
  axios.get(url, config)
  .then(res => {
    console.log(res)
    const data=res['data'];
    data.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+data.ruta_imagen_principal
    if(data.is_ucabista)data.is_ucabista='Si';
    else data.is_ucabista='No';
    setData(data)
  })
  .catch(err => console.log('Login: ', err));
}


useEffect(()=>{
  getTienda(userId)
},[])



  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Usuario</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Nombre : {data.first_name}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Apellido : {data.last_name}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Email: {data.email}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Es Ucabista?: {data.is_ucabista}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={data.ruta_imagen_principal}
                  alt=""
                />
              </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

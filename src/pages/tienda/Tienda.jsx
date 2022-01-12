import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./tienda.css";
import "./userList.css";
import { useParams } from "react-router";
import { useState,useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import axios from 'axios';



export default function Tienda() {
  let { tiendaId } = useParams();
  const [data,setData] =useState({})
  const [dataDueno, setDataDueno] = useState({});
  const [dataUser, setDataUser] = useState(userRows);
  const [dataProductos,setDataProductos] = useState([
    {
      id: '',
      titulo: '',
      cantidad: '',
        estado_publicado: '',
        descripcion: ''
    }]
    );

    
  

  const getTienda= async(tiendaId) =>{
    const url=`http://127.0.0.1:8000/api/tienda/`+tiendaId;
    const resp= await fetch(url);
    const data= await resp.json();
    let tienda =data['tienda'];
    let dueno= data['dueno'];
    let productos= data['productos'];
    tienda.ruta_imagen_home='http://127.0.0.1:8000/uploads/'+tienda.ruta_imagen_home
    tienda.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+tienda.ruta_imagen_principal
    dueno.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+dueno.ruta_imagen_principal
    setData(tienda);
    setDataDueno(dueno)
    setDataProductos(productos)
  }


  useEffect(()=>{
    getTienda(tiendaId)
  },[])

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "titulo",
      headerName: "titulo",
      width: 200,
    },
    { field: "cantidad", headerName: "cantidad", width: 200 },
    {
      field: "estado_publicado",
      headerName: "estado_publicado",
      width: 120,
    },
    {
      field: "descripcion",
      headerName: "descripcion",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/producto/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  function handleSubmitDuenoDeNegocio (e){
    e.preventDefault();
    let username        = document.getElementById("username").value;
    let first_name      = document.getElementById("first_name").value;
    let last_name       = document.getElementById("last_name").value;
    let email           = document.getElementById("email").value;
    let password        = document.getElementById("password").value;
    let imagen_principal = document.getElementById("imagen_principal").value;
    let fail=false;

    if(username == 0) {
      document.getElementById('username-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('username-error').style.display = 'none';

    if(first_name == 0) {
      document.getElementById('first_name-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('first_name-error').style.display = 'none';
    
    if(last_name == 0) {
      document.getElementById('last_name-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('last_name-error').style.display = 'none';

    if(email == 0) {
      document.getElementById('email-error').style.display = 'block';
      fail=true;
    }
    else  {
      document.getElementById('email-error').style.display = 'none'
      if(pruebaemail(email)==0) {
        document.getElementById('email-structure-error').style.display = 'block'
        fail=true;
      }
      else document.getElementById('email-structure-error').style.display = 'none'
    };

    
    if(password == 0) {
      document.getElementById('password-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('password-error').style.display = 'none';

    if(fail==false){
      let axiosConfig = {
        headers: {'Access-Control-Allow-Origin': '*' }
      };

      const is_dueño=1;
      const is_ucabista=0;
      const is_not_ucabista=0;


      const body ={ username       ,
                    first_name     ,
                    last_name      ,
                    email          ,
                    password,
                    is_dueño,
                    is_ucabista,
                    is_not_ucabista};
      
      axios.post(`http://127.0.0.1:8000/api/usuario/`+dataDueno.id, body)
       .then(res => {
        let dueno= res['data']['user'];
        setDataDueno(dueno);
      })
       .catch(err => console.log('Login: ', err));
    }
  }

  function pruebaemail (valor){
    const re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(!re.exec(valor)){
      return 0
    }
    else return 1
  }

  function handleSubmitTienda (e){
    e.preventDefault();
    let titulo        = document.getElementById("titulo").value;
    let fail=false;

    if(titulo == 0) {
      document.getElementById('titulo-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('titulo-error').style.display = 'none';

    if(fail==false){
      const dueno_id=dataDueno.id;
      const body ={ titulo,dueno_id };
      
      axios.post(`http://127.0.0.1:8000/api/tienda/`+data.id, body)
       .then(res => {
        console.log(res);
        let tienda= res['data']['tienda'];
        tienda.ruta_imagen_home='http://127.0.0.1:8000/uploads/'+tienda.ruta_imagen_home
        tienda.ruta_imagen_principal='http://127.0.0.1:8000/uploads/'+tienda.ruta_imagen_principal
        setData(tienda);
      })
       .catch(err => console.log('Login: ', err));
    }
  }


  return (
    <div className="tienda">
      <div className="tiendaTitleContainer">
        <h1 className="tiendaTitle">Dueno del Negocio</h1>
      </div>
      <div className="tiendaContainer">
        <div className="tiendaShow">
          <div className="tiendaShowTop">
            <div className="tiendaShowTopTitle">
              <span className="tiendaShowtiendaname">{dataDueno.username}</span>
            </div>
          </div>
          <div className="tiendaShowBottom">
            <div className="tiendaShowInfo">
              <PermIdentity className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">{dataDueno.first_name}</span>
            </div>
            <div className="tiendaShowInfo">
              <CalendarToday className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">{dataDueno.last_name}</span>
            </div>
            <div className="tiendaShowInfo">
              <PhoneAndroid className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">{dataDueno.email}</span>
            </div>
          </div>
        </div>
        <div className="tiendaUpdate">
          <span className="tiendaUpdateTitle">Edit</span>
          <form className="tiendaUpdateForm" onSubmit={handleSubmitDuenoDeNegocio} id='miFormulario'>
            <div className="tiendaUpdateLeft">
              <div className="tiendaUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={dataDueno.username}
                  className="tiendaUpdateInput"
                  id='username'
                />
                <p id="username-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>

              <div className="tiendaUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder={dataDueno.first_name}
                  className="tiendaUpdateInput"
                  id='first_name'
                />
                 <p id="first_name-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="tiendaUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder={dataDueno.last_name}
                  className="tiendaUpdateInput"
                  id='last_name'
                />
                 <p id="last_name-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="tiendaUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={dataDueno.email}
                  className="tiendaUpdateInput"
                  id='email'
                />
                 <p id="email-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
                 <p id="email-structure-error" className="text-danger" style={{display:'none'}}>Ingrese la estructura de un correo valida </p>
              </div>
              <div className="tiendaUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="*****"
                  className="tiendaUpdateInput"
                  id='password'
                />
                 <p id="password-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
            </div>
            <div className="tiendaUpdateRight">
              <div className="tiendaUpdateUpload">
                <img
                  className="tiendaUpdateImg"
                  src={data.ruta_imagen_home}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="tiendaUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }}  id='imagen_principal'/>
              </div>
              <button className="tiendaUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    
    
      <div className="tiendaTitleContainer">
        <h1 className="tiendaTitle">Tienda</h1>
      </div>
      <div className="tiendaContainer">
        <div className="tiendaShow">
          <div className="tiendaShowTop">
            <div className="tiendaShowTopTitle">
              <span className="tiendaShowtiendaname">{data.titulo}</span>
  
            </div>
          </div>
        </div>
        <div className="tiendaUpdate">
          <span className="tiendaUpdateTitle">Edit</span>
          <form className="tiendaUpdateForm" onSubmit={handleSubmitTienda}>
            <div className="tiendaUpdateLeft">
              <div className="tiendaUpdateItem">
                <label>Titulo de la tienda</label>
                <input
                  type="text"
                  placeholder={data.titulo}
                  className="tiendaUpdateInput"
                  id='titulo'
                />
                 <p id="titulo-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
            </div>
            <div className="tiendaUpdateRight">
              <div className="tiendaUpdateUpload">
                <img
                  className="tiendaUpdateImg"
                  src={data.ruta_imagen_home}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="tiendaUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              
              <button className="tiendaUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>

    <br></br>
      <h1>Productos</h1>
        <DataGrid
          rows={dataProductos}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />

    </div>
  );
}

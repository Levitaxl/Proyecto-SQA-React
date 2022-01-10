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



export default function Tienda() {
  let { tiendaId } = useParams();
  const [data,setData] =useState({})
  const [dataDueno, setDataDueno] = useState({});
  const [dataUser, setDataUser] = useState(userRows);
  const [dataProductos,setDataProductos] = useState({});
  

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
    setDataProductos(productos);
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
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.titulo}
          </div>
        );
      },
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

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  return (
    <div className="tienda">
      <div className="tiendaTitleContainer">
        <h1 className="tiendaTitle">Dueno del Negocio</h1>
      </div>
      <div className="tiendaContainer">
        <div className="tiendaShow">
          <div className="tiendaShowTop">
            <img
              src={data.ruta_imagen_home}
              alt=""
              className="tiendaShowImg"
            />
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
          <form className="tiendaUpdateForm">
            <div className="tiendaUpdateLeft">
              <div className="tiendaUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={dataDueno.username}
                  className="tiendaUpdateInput"
                />
              </div>

              <div className="tiendaUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder={dataDueno.first_name}
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder={dataDueno.last_name}
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={dataDueno.email}
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="*****"
                  className="tiendaUpdateInput"
                />
              </div>
            </div>
            <div className="tiendaUpdateRight">
              <div className="tiendaUpdateUpload">
                <img
                  className="tiendaUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
    
    
      <div className="tiendaTitleContainer">
        <h1 className="tiendaTitle">Tienda</h1>
      </div>
      <div className="tiendaContainer">
        <div className="tiendaShow">
          <div className="tiendaShowTop">
            <img
              src={data.ruta_imagen_home}
              alt=""
              className="tiendaShowImg"
            />
            <div className="tiendaShowTopTitle">
              <span className="tiendaShowtiendaname">{data.titulo}</span>
            </div>
          </div>
          <div className="tiendaShowBottom">
            <span className="tiendaShowTitle">Account Details</span>
            <div className="tiendaShowInfo">
              <PermIdentity className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">{data.titulo}</span>
            </div>
            <div className="tiendaShowInfo">
              <CalendarToday className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">10.12.1999</span>
            </div>
            <span className="tiendaShowTitle">Contact Details</span>
            <div className="tiendaShowInfo">
              <PhoneAndroid className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="tiendaShowInfo">
              <MailOutline className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="tiendaShowInfo">
              <LocationSearching className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="tiendaUpdate">
          <span className="tiendaUpdateTitle">Edit</span>
          <form className="tiendaUpdateForm">
            <div className="tiendaUpdateLeft">
              <div className="tiendaUpdateItem">
                <label>tiendaname</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="tiendaUpdateInput"
                />
              </div>
              <div className="tiendaUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="tiendaUpdateInput"
                />
              </div>
            </div>
            <div className="tiendaUpdateRight">
              <div className="tiendaUpdateUpload">
                <img
                  className="tiendaUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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

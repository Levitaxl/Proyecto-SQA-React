import "./tiendaList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios';

export default function TiendaList() {
  
  const [data,setData] =useState([])
  
  
  const getAllTiendas= async() =>{
    let user = window.localStorage.getItem('loggedNotAppUserAdmin');
    if (user!= null) user=JSON.parse(user);
    const token=user['access_token'];
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const url=`http://127.0.0.1:8000/api/getAllTiendas`;
   
    axios.get(url, config)
    .then(res => {
      const data=res['data'];
      const tiendas = data.map(tienda => {
        return{
            id:tienda.id,
            titulo: tienda.titulo
        } 
      });

      setData(tiendas);
    })
    .catch(err => console.log('Login: ', err));

    
  }
  useEffect(()=>{
    getAllTiendas()
  },[])



  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "titulo",
      headerName: "titulo",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.titulo}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/tienda/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
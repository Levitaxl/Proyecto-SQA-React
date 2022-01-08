import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getAllTiendas } from "../../apis/Tiendas/GetAllTiendas"

export default function ProductList() {


  const url=`http://127.0.0.1:8000/api/tienda`;
  const [data,setData] =useState([])
  
  
  const getAllTiendas= async() =>{
    const url=`http://127.0.0.1:8000/api/tienda`;
    const resp= await fetch(url);
    const data= await resp.json();
    const tiendas = data.map(tienda => {
      return{
          id:tienda.id,
          titulo: tienda.titulo
      } 
    });
    setData(tiendas);
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
            <Link to={"/product/" + params.row.id}>
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

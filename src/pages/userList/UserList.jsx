import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [data, setData] = useState([]);

  
  
  const getAllTiendas= async() =>{
    let user = window.localStorage.getItem('loggedNotAppUserAdmin');
    if (user!= null) user=JSON.parse(user);
    const token=user['access_token'];
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const url=`http://127.0.0.1:8000/api/auth/getAllUsers`;
   
    axios.get(url, config)
    .then(res => {
      console.log(res)
      const data=res['data'];
      setData(data);
    })
    .catch(err => console.log('Login: ', err));

    
  }
  useEffect(()=>{
    getAllTiendas()
  },[])

  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 200
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "is_ucabista",
      headerName: "Es Ucabista?",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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

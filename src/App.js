import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Register from './pages/Register/Register'
import TiendaList from "./pages/tiendaList/TiendaList";
import Tienda from "./pages/tienda/Tienda";
import Producto from "./pages/producto/Producto"

function App() {
  let admin = window.localStorage.getItem('loggedNotAppUserAdmin');
  if (admin!= null) admin=JSON.parse(admin);
  return (
    <Router>
        <Switch>
          <Route path="/admin/index" render={()=>{
            if(admin!=null)return <div className="container"><Sidebar /><Home /></div>
            else window.location.href = "/login";
          }}>
          </Route>

          <Route path="/tienda/:tiendaId"  render={()=>{
            if(admin!=null)return <div className="container"><Sidebar /><Tienda /></div>
            else window.location.href = "/login";
          }}>
          </Route>

          <Route path="/tiendas"  render={()=>{
            if(admin!=null)return <div className="container"><Sidebar /><TiendaList /></div>
            else window.location.href = "/login";
          }}>
          </Route>

          <Route path="/users">
            <Sidebar />
            <UserList />
          </Route>
          <Route path="/user/:userId">
           <Sidebar />
            <User />
          </Route>
          <Route path="/newUser">
            <Sidebar />
            <NewUser />
          </Route>
          <Route path="/products">
            <Sidebar />
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Sidebar />
            <Product />
          </Route>
          <Route path="/newproduct">
            <Sidebar />
            <NewProduct />
          </Route>

          <Route path="/register">
            <Register />
          </Route>/


          
          <Route path="/producto/:productoId">
            <Sidebar />
            <Producto />
          </Route>
          <Route path="/newTienda">
            <Sidebar />
            <NewProduct />
          </Route>





        </Switch>
    </Router>
    
  );
}

export default App;

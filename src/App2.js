import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProductList from "./pages/ProductListC/ProductList";
import Product from './tiendas/src/pages/Product'
import Login from   "./pages/Login/Login"
import Tiendas from './pages/Tiendas/Tiendas'

function App2() {
  let user = window.localStorage.getItem('loggedNotAppUser');
  if (user!= null) user=JSON.parse(user);

  let admin = window.localStorage.getItem('loggedNotAppUserAdmin');
  if (admin!= null) admin=JSON.parse(admin);
  return (
    <Router>
        <Switch>
          <Route path="/home" render={()=>{
            if(user!=null)return <Tiendas/>
            else return <Redirect to='/login'/>;
          }}>
          </Route>

          <Route path="/productsList/:tiendaId"
           render={()=>{
            if(user!=null)return <ProductList/>
            else return <Redirect to='/login'/>;
          }}>
          </Route>


          <Route path="/tienda/producto"
          render={()=>{
            if(user!=null)return <Product/>
            else return <Redirect to='/login'/>;
          }}>
          </Route>

     

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/admin/login">
            <Login />
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App2;

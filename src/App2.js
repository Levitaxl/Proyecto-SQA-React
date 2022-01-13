import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomeTienda from './tiendas/src/pages/Home'
import ProductList from './tiendas/src/pages/ProductList'
import Product from './tiendas/src/pages/Product'
import Register from './tiendas/src/pages/Register'
import Login from './tiendas/src/pages/Login'

function App2() {
  let user = window.localStorage.getItem('loggedNotAppUser');
  if (user!= null) user=JSON.parse(user);
  return (
    <Router>
        <Switch>
          <Route path="/home" render={()=>{
            if(user!=null)return <HomeTienda/>
            else return <Redirect to='/login'/>;
          }}>
          </Route>

          <Route path="/productsList/:tiendaId">
            <ProductList />
          </Route>


          <Route path="/tienda/producto">
            <Product />
          </Route>

     

          <Route path="/login">
            <Login />
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App2;

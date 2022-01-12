import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeTienda from './tiendas/src/pages/Home'
import ProductList from './tiendas/src/pages/ProductList'
import Product from './tiendas/src/pages/Product'
import Register from './tiendas/src/pages/Register'
import Login from './tiendas/src/pages/Login'

function App2() {
  return (
    <Router>
        <Switch>
          <Route path="/home">
            <HomeTienda />
          </Route>

          <Route path="/productsList/:tiendaId">
            <ProductList />
          </Route>


          <Route path="/tienda/producto">
            <Product />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/tienda/login">
            <Login />
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App2;

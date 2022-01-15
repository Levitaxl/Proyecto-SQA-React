import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProductList from './tiendas/src/pages/ProductList'
import Product from './tiendas/src/pages/Product'
import Login from   "./pages/Login/Login"
import Tiendas from './pages/Tiendas/Tiendas'

function App2() {
  let user = window.localStorage.getItem('loggedNotAppUser');
  if (user!= null) user=JSON.parse(user);
  return (
    <Router>
        <Switch>
          <Route path="/home" render={()=>{
            if(user!=null)return <Tiendas/>
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

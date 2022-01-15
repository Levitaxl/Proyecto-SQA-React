import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {

   function myFunction(){
    window.localStorage.removeItem('loggedNotAppUserAdmin');
    alert('Se ha cerrado su sesion');
    window.location.href = "/login";
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Clientes
              </li>
            </Link>
            <Link to="/tiendas" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
               Tiendas 
              </li>
            </Link>
              <li className="sidebarListItem" onClick={myFunction}>
                <Timeline className="sidebarIcon" />
                Log Out 
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

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

export default function Tienda() {
  return (
    <div className="tienda">
      <div className="tiendaTitleContainer">
        <h1 className="tiendaTitle">Edit tienda</h1>
        <Link to="/newtienda">
          <button className="tiendaAddButton">Create</button>
        </Link>
      </div>
      <div className="tiendaContainer">
        <div className="tiendaShow">
          <div className="tiendaShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="tiendaShowImg"
            />
            <div className="tiendaShowTopTitle">
              <span className="tiendaShowtiendaname">Anna Becker</span>
              <span className="tiendaShowtiendaTitle">Software Engineer</span>
            </div>
          </div>
          <div className="tiendaShowBottom">
            <span className="tiendaShowTitle">Account Details</span>
            <div className="tiendaShowInfo">
              <PermIdentity className="tiendaShowIcon" />
              <span className="tiendaShowInfoTitle">annabeck99</span>
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
    </div>
  );
}

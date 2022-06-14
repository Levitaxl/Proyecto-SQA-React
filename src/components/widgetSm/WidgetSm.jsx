import "./widgetSm.css";
import axios from 'axios';
export default function WidgetSm() {
  function handleSubmitDuenoDeNegocio (e){
    e.preventDefault();
    let username        = document.getElementById("username").value;
    let first_name      = document.getElementById("first_name").value;
    let last_name       = document.getElementById("last_name").value;
    let email           = document.getElementById("email").value;
    let password        = document.getElementById("password").value;
    let imagen_dueno = document.getElementById("imagen_dueno").files[0];
    let titulo        = document.getElementById("titulo").value;
    let imagen_tienda = document.getElementById("imagen_tienda").files[0];
    let fail=false;

    console.log('el email es:'+ email);
    console.log(pruebaemail(email));

    if(username == 0) {
      document.getElementById('username-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('username-error').style.display = 'none';

    if(first_name == 0) {
      document.getElementById('first_name-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('first_name-error').style.display = 'none';
    
    if(last_name == 0) {
      document.getElementById('last_name-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('last_name-error').style.display = 'none';

    if(email == 0) {
      document.getElementById('email-error').style.display = 'block';
      fail=true;
    }
    else  {
      document.getElementById('email-error').style.display = 'none'
      if(pruebaemail(email)==0) {
        document.getElementById('email-structure-error').style.display = 'block'
        fail=true;
      }
      else document.getElementById('email-structure-error').style.display = 'none'
    };

    
    if(password == 0) {
      document.getElementById('password-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('password-error').style.display = 'none';

    if(titulo == 0) {
      document.getElementById('titulo-error').style.display = 'block';
      fail=true;
    }
    else  document.getElementById('titulo-error').style.display = 'none';


    
    if(fail==false){
      const is_dueño=1;
      const is_ucabista=0;
      const is_not_ucabista=0;

      var datos = new FormData(); 
      datos.append('username', username);
      datos.append('first_name', first_name);
      datos.append('last_name', last_name);
      datos.append('email', email);
      datos.append('password', password);
      datos.append('is_dueño', is_dueño);
      datos.append('is_ucabista', is_ucabista);
      datos.append('is_not_ucabista', is_not_ucabista);
      datos.append('imagen_principal', imagen_dueno);
      datos.append('imagen_tienda', imagen_tienda);
      datos.append('titulo', titulo); 

      const user = JSON.parse(window.localStorage.getItem('loggedNotAppUserAdmin'));
      const token= user['access_token'];

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      
      axios.post(`http://127.0.0.1:8000/api/auth/storeDuenoDeNegocio`,datos,config)
       .then(res => {
         console.log(res)
         if(res['data']['created']==false){
          console.log(res['data']['errors'][0]);
          if(res['data']['errors'][0]=='The titulo has already been taken.')document.getElementById('titulo-has-already-been-taken-error').style.display = 'block';
          else document.getElementById('titulo-has-already-been-taken-error').style.display = 'none';

          if(res['data']['errors'][0]=='El nombre de usuario ya se encuentra registrado')document.getElementById('username-has-already-been-taken-error').style.display = 'block';
          else document.getElementById('username-has-already-been-taken-error').style.display = 'none';

          if(res['data']['errors'][0]=='El email de usuario ya se encuentra registrado')document.getElementById('email-has-already-been-taken-error').style.display = 'block';
          else document.getElementById('email-has-already-been-taken-error').style.display = 'none';
        }

        else {
          alert('usuario registrado exitosamente');
          const tienda_id=res['data']['tienda']['id'];
          window.location.href = "/tienda/"+tienda_id;
        }
      })
       .catch(err => console.log('Login: ', err));
    }
  }

  function pruebaemail (valor){
    const re=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!re.exec(valor)){
      return 0
    }
    else return 1
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nueva Tienda</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
        <form className="tiendaUpdateForm" onSubmit={handleSubmitDuenoDeNegocio} id='miFormulario'>
            <div className="tiendaUpdateLeft">
              <div className="tiendaUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  className="tiendaUpdateInput"
                  id='username'
                />
                <p id="username-has-already-been-taken-error" className="text-danger" style={{display:'none'}}>El username ya se encuentra registrado en el sistema </p>
                <p id="username-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>

              <div className="tiendaUpdateItem">
                <label>Nombre</label>
                <input
                  type="text"
                  className="tiendaUpdateInput"
                  id='first_name'
                />
                 <p id="first_name-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="tiendaUpdateItem">
                <label>Apellido</label>
                <input
                  type="text"
                  className="tiendaUpdateInput"
                  id='last_name'
                />
                 <p id="last_name-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
              <div className="tiendaUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  className="tiendaUpdateInput"
                  id='email'
                />
                <p id="email-has-already-been-taken-error" className="text-danger" style={{display:'none'}}>El email ya se encuentra en el sistema </p>
                 <p id="email-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
                 <p id="email-structure-error" className="text-danger" style={{display:'none'}}>Ingrese la estructura de un correo valida </p>
              </div>
              <div className="tiendaUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="*****"
                  className="tiendaUpdateInput"
                  id='password'
                />
                 <p id="password-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>

              <div className="tiendaUpdateItem">
                <label>Imagen Principal</label>
                <input
                  type="file"
                  className="tiendaUpdateInput"
                  id='imagen_dueno'
                />
                 <p id="imagen_dueno-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>

              <div className="tiendaUpdateLeft">
              <div className="tiendaUpdateItem">
                <label>Titulo de la tienda</label>
                <input
                  type="text"
                  className="tiendaUpdateInput"
                  id='titulo'
                />
                 <p id="titulo-has-already-been-taken-error" className="text-danger" style={{display:'none'}}>El titulo ya se encuentra en el sistema </p>
                 <p id="titulo-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>
            </div>

            <div className="tiendaUpdateItem">
                <label>Imagen Tienda</label>
                <input
                  type="file"
                  className="tiendaUpdateInput"
                  id='imagen_tienda'
                />
                 <p id="imagen_tienda-error" className="text-danger" style={{display:'none'}}>Este campo no puede ser vacío </p>
              </div>

              
              <div className="tiendaUpdateItem">
                

              <button className="tiendaUpdateButton">Crear</button> 
              </div>
           
            </div>
         
         
         </form>
        </li>
      </ul>
    </div>
  );
}

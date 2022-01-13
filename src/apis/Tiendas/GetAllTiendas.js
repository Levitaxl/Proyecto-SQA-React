export  const getAllTiendas= async() =>{
    const url=`http://127.0.0.1:8000/api/tienda`;
    const resp= await fetch(url);
    const data= await resp.json();

    const tiendas = data.map(tienda => {
        return{
            id:tienda.id,
            titulo: tienda.titulo
        } 
    });
    return tiendas;
}
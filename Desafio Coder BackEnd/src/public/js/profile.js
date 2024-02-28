fetch("/api/current", {
    method:"GET",
    headers:{
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
})
.then(response=>{
    if(response.status===401){
        window.location.replace("/login")
    }else{
        return response.json();
    }
})
.then(json =>{
    const p = document.getElementById("result");
    p.innerHTML= `Hola, su email es:${json.payload.email}, su contraseña es:${json.payload.password}, su rol es:${json.payload.rol} y su id de carrito es: ${json.payload.cart}`
})
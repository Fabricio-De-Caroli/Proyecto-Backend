fetch("/api/sessions/current", {
    method:"GET",
    headers:{
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
}).then(response=>{
    if(response.status===401){
        window.location.replace("api/sessions/login")
    }else{
        return response.json();
    }
})
.then(json =>{
    const p = document.getElementById("result");
    p.innerHTML= `Hola, tus datos son ${json.payload.email} y ${json.payload.password}`
})
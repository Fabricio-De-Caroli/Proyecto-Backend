class sessionController{
    static register = async(req,res)=>{
        res.send({status:"success", message:"User registrado"})
    }
    static login = async (req,res) =>{
        if(!req.user){
            return res.status(400).send({status:"error"})
        }
        req.session.user ={
            full_name:`${req.user.first_name}${req.user.last_name}`,
            age:req.user.age,
            email:req.user.email,
            rol:"User"
        }
        if(req.user.email === "adminCoder@coder.com" || req.user.password === "adminCod3r123"){
            req.session.user ={
                full_name:`${req.user.first_name}${req.user.last_name}`,
                email: user.email,
                age: user.age,
                rol: "Admin"
            }
        }
    
        res.send({status:"success", payload:req.user})
    }
    static failRegister = async (req,res)=>{
        console.log("Fallo el registro");
        res.send({error:"fallo en el registro"})
    }
    static failLogin = (req, res)=>{
        res.send({error:"fail login"})
    }
    static getGithub = async (req,res)=>{}
    static githubCallBack = async (req,res) =>{
        req.session.user = req.user;
        res.redirect("/")
    }
    static logout = (req,res)=>{
        req.session.destroy(err=>{
            if(err){
                return res.status(500).send({
                    status: "error",
                    error:"No se pudo desloguear"
                })
            }
            res.redirect("/login");
        })
    }
}

export {sessionController}
export const checkRole = (roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.json({status:"error", message:"necesitas estas autenticado"});
        }
        if(!roles.includes(req.user.rol)){
            return res.json({status:"error", message:"No estas autorizado"})
        }
        next();
    }
}
const customError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authMiddleWare=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer"))
        throw new customError("No Token Fonded", 401);
    const token=authHeader.split(" ")[1];
    try {
        const decoded=jwt.verify(token,process.env.jwt_secret)  
        const {id,username}=decoded;
        req.user={id,username};
        next();
    } catch (error) {
        throw new customError("No Token Fonded", 401);
    }

}

module.exports=authMiddleWare;
import jwt from "jsonwebtoken";

export const verifyUser = (req,res,next)=>{
    // get token
    const token = req.cookies.token;
    if(!token){
        return res.send({Error: "You are not Authorized!"})
    }else{
        // verify token
        jwt.verify(token, "jwt-secret-key", (err,decoded)=>{
            if(err){
                return res.send({Error: "Token is not valid!"})
            }else{
                req.id = decoded.id;
                next();
            }
        })

    }
}
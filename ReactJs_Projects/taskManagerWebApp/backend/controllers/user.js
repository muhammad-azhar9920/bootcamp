import bcrypt from 'bcryptjs';
import { db } from "../db.js";

export const getSingleUser =(req,res)=>{
    const id = req.params.id
    console.log(id);
    const q = 'SELECT * FROM users WHERE id=?';
    db.query(q,[id],(err,result)=>{
        if(err) return res.send({Error: err});
        return res.send(result);
    })
}

// change profile pic
export const updateProfilePic=(req,res)=>{
    const id = req.params.id
    const picture = req.file.filename;
    const q = 'UPDATE users SET picture=? WHERE id=?';
    db.query(q,[picture,id],(err,result)=>{
        if(err) return res.send({Error: err});
        return res.send({success: true, msg: 'Successfully Updated!'});
    })
}

// change password
export const changePassword=(req,res)=>{
    const {oldPass,newPass} = req.body;
    const id = req.params.id;
    // COMPARE PASSWORD
    // get old password from db
    const q = 'SELECT * FROM users WHERE id=?';
    db.query(q,[id],(err,result)=>{
        if(err) return res.send({Error: err});
        bcrypt.compare(oldPass.toString(), result[0].password,(err,response)=>{
            if(err) return res.send({Error:err});
            if(response){
                //  Hash the new password
                 const salt = bcrypt.genSaltSync(10);
                 bcrypt.hash(newPass.toString(),salt,(err,hash)=>{
                    if(err) return res.send({Error:'Hashing password Error!'});
                    const q2 = 'UPDATE users SET password=? WHERE id=?';
                    db.query(q2,[hash,id],(err,result)=>{
                        if(err) return res.send({Error: err});
                        return res.send({success: true, msg: 'Successfully Updated !'});
                    })
                 })
            }else{
                return res.send({Error:'Old Password is incorrect !'});
            }
        })
    })
}
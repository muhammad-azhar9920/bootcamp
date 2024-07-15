import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {db} from '../db.js';

// Register User
export const handleRegisterUser=(req,res)=>{
    const {name,email,password} = req.body;
    const picture = req.file.filename;
    // CHECK USER EXISTS OR NOT
    const q = "SELECT * FROM users WHERE email=?";
    db.query(q,[email],(err,result)=>{
        if(err) return res.send({Error:err});
        if(result.length > 0) return res.send({Error:'User already Exists!'});

        // Hash the password and create a User
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(password.toString(),salt,(err,hash)=>{
            if(err) return res.send({Error:'Hashing password Error!'});
            const q = "INSERT INTO users(`name`,`email`,`password`,`picture`) VALUES (?)";
            const values = [
                name,
                email,
                hash,
                picture
            ]
            db.query(q,[values],(err,result)=>{
                if(err) return res.send({Error:err});
                return res.status(201).send({msg: "User has been created!",success:true});
            })
        });
    })
}

// Login User
export const handleLoginUser=(req,res)=>{
    const {email,password} = req.body;
    // CHECK EMAIL EXIST OR NOT
    const q = "SELECT * FROM users WHERE email=?";
    db.query(q,[email],(err,result)=>{
        if(err) return res.send({Error: err});
        if(result.length > 0){
            // COMPARE PASSWORD
            bcrypt.compare(password.toString(),result[0].password, (err,response)=>{
                if(err) res.send({Error:err});
                if(response){
                    // GENERATE TOKEN
                    // I'm sending id for getting User data by id on Home page
                    const id = result[0].id;
                    const token = jwt.sign({id},"jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token',token);
                    res.send({msg:'Successfully',success: true});
                }else{
                    return res.send({Error: "Password doesn't match!"});
                }
            })
        }else{
            return res.send({Error: "User doesn't exist with this Email!"});
        }
    })
}

// Logout User
export const handleLogoutUser=(req,res)=>{
    res.clearCookie('token');
    return res.send({success:true});
}

// Check User Authentication
export const handleCheckAuthUser=(req,res)=>{
    return res.send({success:true, id: req.id});
}


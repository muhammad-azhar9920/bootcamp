const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const jwtSecretKey = "azhar-shaikh";
const salt = 10;
const PORT = 8000;

///////////////////////////////// Database Connection //////////////////////////////
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mystore'
});
db.connect((err) => {
    if (err) {
        console.log('an error in the connection of database');
    } else {
        console.log(`Database Connected !`)
    }

});

const app = express();

/////////////////////////////////// Middlewares ///////////////////////////////
// to see images from public folder 
app.use(express.static('public'));
// cors middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});

// cookie parser
app.use(cookieParser());

// verify user
const verifyUser = (req,res,next)=>{
     // get token
     const token = req.cookies.token;
     if(!token){
         return res.send({Error: "You are not Authorized!"})
     }else{
         // verify token
         jwt.verify(token, jwtSecretKey, (err,decoded)=>{
             if(err){
                 return res.send({Error: "Token is not valid!"})
             }else{
                 req.name = decoded.name;
                 next();
             }
         })
 
     }
}

// home route
app.get('/', (req, res) => {
    res.send('hello world!');
});

///////////////////////////////// PRODUCTS API's //////////////////////////////////

// GET all Products
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, result) => {
        if (err) {
            console.log('An error occurred during getting data from database!');
        } else {
            res.send(result);
        }
    })
});

// POST Add Product 
app.post('/addproduct', upload.single('file'), (req, res) => {
    const { name, price, color, company } = req.body;
    const image = req.file.filename;
    // console.log(name,price,color,company,image);
    const query = 'INSERT INTO products (name,price,color,company,image) VALUES (?,?,?,?,?)';
    const values = [name, price, color, company, image];
    db.query(query, values, (err, result) => {
        if (err) {
            return res.send({ Error: 'Error in submit product!' })
            console.log('An error occurred during add product in database!');
        } else {
            res.send({ msg: 'Product Successfully added!', success: true });
        }
    })
});

// GET Single product through id
app.get('/updateproduct', (req, res) => {
    const { id } = req.query;
    console.log(id);
    const query = 'SELECT * FROM products WHERE id=?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log('An error occurred during getting single data from database');
        } else {
            res.send(result);
        }
    })
});

// PUT UPDATE product
app.put('/updateproduct', upload.single('file'), (req, res) => {
    const { name, price, color, company, file, id } = req.body;
    // console.log(name,price,color,company);
    let image = file;
    if (req.file) {
        image = req.file.filename;
    }
    const query = 'UPDATE products SET name=?, price=?, color=?, company=?, image=? WHERE id=?';
    const values = [name, price, color, company, image, id];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log('An error occurred during updating single data in database');
        } else {
            res.send({ msg: 'Product Updated Successfully!', success: true });
        }
    })
})

// DELETE PRODUCT
app.delete('/deleteproduct', (req, res) => {
    const { id } = req.query;
    console.log(id);
    const query = 'DELETE FROM products WHERE id=?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log('An error occurred during deleting product from database');
        } else {
            res.send({ msg: 'Deleted Successfully', success: true });
        }
    })
})

/////////////////////////////////////// Signup & Login API's //////////////////////////////
// POST SIGNUP
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO login (name,email,password) VALUES (?)';
    bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
            return res.send({ Error: 'Server Error in hashing password!' });
        } else {
            const values = [
                name,
                email,
                hash
            ]
            console.log(values);
            // check email exist or not
            const query2 = 'SELECT * FROM login WHERE email = ?';
            db.query(query2, [email], (err, result) => {
                if (err) {
                    return res.send({ Error: 'Server Error in checking Email!' });
                }
                if (result.length > 0) {
                    return res.send({ Error: 'This Email is Already Exist!' });
                } else {
                    // add user
                    db.query(query, [values], (err, result) => {
                        if (err) {
                            return res.send({ Error: 'Server Error in Signup!' });
                        } else {
                            res.send({ msg: 'Successfully Signup', success: true });
                        }
                    })
                }
            });
        }
    })
})

// POST LOGIN
app.post('/login',(req,res)=>{
    const {email, password} = req.body;
    const query = 'SELECT * FROM login WHERE email=?';
    db.query(query,[email],(err,result)=>{
        if(err){
            return res.send({ Error: 'Server Error in Login!' });
        }
        if(result.length > 0){
            // compare password
            bcrypt.compare(password.toString(), result[0].password, (err,response)=>{
                if(err) return res.send({Error: 'Server Error in Compare Password!'});
                if(response){
                    // console.log(response);
                    // generate token
                    const name = result[0].name;
                    const token = jwt.sign({name}, jwtSecretKey, {expiresIn: '1d'});
                    res.cookie('token', token);
                    res.send({success:true});
                }else{
                    res.send({Error: "Password doesn't match!"});
                }
            })
        }
        else{
            return res.send({Error: "Email doesn't Existed! "});
        }
    })
})

// check Authentication
app.get('/checkauth',verifyUser,(req,res)=>{
    return res.send({success:true, name: req.name});
})

// Logout User
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.send({success:true});
})

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})
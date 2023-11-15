const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Database Connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'college'
});
db.connect((err)=>{
    if(err) console.log(err);
    console.log('Connected Database');
})

const app = express();
const PORT = 3000;

// Middlewear
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})

// Submit Endpoint
app.post('/submit',(req,res)=>{
    const {name,email} = req.body;
    const query = 'INSERT INTO students (name,email) VALUES (?, ?)';
    db.query(query,[name,email],(err,result)=>{
        if(err) throw err;
        res.redirect('/students');
    })
})

// Show/Get Data EndPoint
app.get('/students',(req,res)=>{
    const query = 'SELECT * FROM students';
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.render(path.join(__dirname, 'views', 'students'),{students : result});
    })
})

// Update Data Endpoint
app.get('/update-student',(req,res)=>{
    const query = 'SELECT * FROM students WHERE id=?';
    const id = req.query.id;
    db.query(query,[id],(err,result)=>{
        if(err) throw err;
        res.render(path.join(__dirname,'views','update-student'),{student : result});
    })
})
app.post('/update-student',(req,res)=>{
    const {name,email,id} = req.body;
    const query = 'UPDATE students set name=?, email=? WHERE id=?';
    db.query(query,[name,email,id],(err,result)=>{
        if(err) throw err;
        res.redirect('/students');
    })
})

// Delete Data Endpoint
app.get('/delete-student',(req,res)=>{
    const query = 'DELETE FROM students WHERE id=?';
    const id = req.query.id;
    db.query(query,[id],(err,result)=>{
        if(err) throw err;
        res.redirect('/students');
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost${PORT}`);
})
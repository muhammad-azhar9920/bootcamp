const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const app = express();
// Middleware for JSON
app.use(express.json());
// Middleware for serve html
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public','index.html'));
})

// Create File with POST
app.post('/create-file',(req,res)=>{
    fs.writeFile('file.txt','Some text of this file.',(err)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('File Successfully created!');
    })
})

// Show File with GET
app.get('/show-file',(req,res)=>{
    fs.readFile('file.txt','utf-8',(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send(data);
    })
});

// Update File with PUT
app.put('/update-file',(req,res)=>{
    fs.writeFile('file.txt',req.body.text, (err)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }
        res.send('File Successfully Updated!');
    })
})

// delete File with DELETE
app.delete('/delete-file',(req,res)=>{
    fs.unlink('file.txt',(err)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }
        res.send('File Successfully Deleted!');
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost${PORT}`);
})
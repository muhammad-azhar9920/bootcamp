import { db } from "../db.js";

// GET all tasks of specific user
export const getAllTasks = (req, res) => {
    const id = req.params.id;
    const q = 'SELECT * FROM users LEFT JOIN tasks ON users.id = tasks.user_id WHERE users.id = ?';
    db.query(q, [id], (err, result) => {
        if (err) return res.send({ Error: err });
        return res.send({result,success:true});
    });
}

// GET single task
export const getSingleTask=(req,res)=>{
    const id = req.params.id;
    const q = 'SELECT * FROM tasks WHERE id=?';
    db.query(q,[id],(err,result)=>{
        if(err) return res.send({Error:err});
        return res.send({result});
    })
}

// ADD task
export const AddTask = (req, res) => {
    const { title, description, user_id } = req.body;
    const q = "INSERT INTO tasks (title,description,user_id) VALUES(?)";
    const values = [
        title,
        description,
        user_id
    ]
    db.query(q, [values], (err, result) => {
        if (err) return res.send({ Error: err });
        return res.send({success:true,msg:'Successfully added task'});
    })
}

// UPDATE task
export const editTask=(req,res)=>{
    const {id,title,description,user_id} = req.body;
    const q = 'UPDATE tasks SET title=?, description=?, user_id=? WHERE id=?';
    db.query(q,[title,description,user_id,id],(err,result)=>{
        if(err) return res.send({Error: err});
        return res.send({success:true,msg:'Successfully Updated!'})
    })
}

// DELETE task
export const deleteTask=(req,res)=>{
    const id = req.params.id
    const q = 'DELETE FROM tasks WHERE id=?';
    db.query(q,[id],(err,result)=>{
        if(err) return res.send({Error:err});
        return res.send({success:true,msg:'Deleted Successfully!'});
    })
}

// UPDATE (pending task into completed task) by id
export const updatePendingTask=(req,res)=>{
    const id = req.params.id
    const q = 'UPDATE tasks SET iscompleted=? WHERE id=?';
    db.query(q,[1,id],(err,result)=>{
        if(err) return res.send({Error: err});
        return res.send({success:true,msg:'Successfully Updated!'});
    })
}

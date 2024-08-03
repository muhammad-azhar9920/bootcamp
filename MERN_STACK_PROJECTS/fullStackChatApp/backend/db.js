import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Database Connected');  
    }).catch((error)=>{
        console.log(`there is an error in the connection of Database!`);
    })
}
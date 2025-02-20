import mongoose from 'mongoose'

export const connectDB=async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGODB_URL);
        console.log('mongo db connected',conn.connection.host);

    }
    catch(e){
        console.log('Mongo db connection error',e);
    }
}
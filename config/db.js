const mongoose=require("mongoose");

mongoose.set('strictQuery', false);

const connectDB=async()=>{
    mongoose.connect(process.env.mongo_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("mongodb connected successfully!..."))
    // .catch(()=>console.log("mongodb not connected"));
    .catch((err)=>console.log(err.message));
}


module.exports=connectDB;
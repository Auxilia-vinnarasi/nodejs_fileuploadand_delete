const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    }
},
// {
//     timestamps:true,
// },
{
    versionKey: false,
}
)

module.exports=mongoose.model("users",userSchema);
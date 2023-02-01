const mongoose=require("mongoose");

const notifySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    read:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps:true
},
{
    versionKey:false,
})

module.exports=mongoose.model("notify",notifySchema);
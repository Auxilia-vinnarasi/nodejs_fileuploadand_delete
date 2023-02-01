const User=require("../models/userModels");
const path=require("path");
const fs=require("fs");

const userData=async(req,res)=>{ 
    try{
        const user={
            name:req.body.name,
            email:req.body.email,
            file:req.file.originalname,
        }
    const newUser=await User.create(user);
    return res.status(200).json({
        success:true,
        message:"user posted successfully!...",
        newUser,
    })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error" + err.message,
        })
    }
}

const deleteFile=async(req,res)=>{
    try{
        const deleted= await User.findByIdAndDelete({_id:req.params.id});
        // const filePath = path.join(__dirname, 'uploads/',deleted.file);

        fs.unlink ("./uploads/"+deleted.file,(err)=>{
        if (err) {
            console.log("failed to delete local file:"+err);
        } else {
            console.log('successfully deleted local file');                                
        }
       });
    //    .then(()=>console.log("file deleted successfully"))
    //    .catch(()=>console.log("Error deleting a file"));
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     console.error(err);
        //     return res.status(500).send({
        //       success: false,
        //       message: 'Error deleting file'
        //     });
        //   }
      
        //   res.send({
        //     success: true,
        //     message: 'File deleted'
        //   });
        //       })
      
        // return res.status(200).json({
        //     success:true,
        //     message:"file deleted successfully",
        //     deleted

        //      }
        
        // )
        return res.status(200).json({
            success:true,
            message:"file deleted successfully!..",
            deletefile:deleted,
        })
           

}
   
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"file not deleted!.."
        })
    }
}


module.exports={userData,deleteFile};
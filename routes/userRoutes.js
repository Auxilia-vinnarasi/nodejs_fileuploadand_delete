const userController=require("../controllers/userController");
const router=require("express").Router();

const upload=require("../middlewares/upload");

router.post("/",upload.single("file"),userController.userData);

router.delete("/:id",userController.deleteFile);

module.exports=router;



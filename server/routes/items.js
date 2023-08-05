const express= require("express");
const router=express.Router();
const itemsController=require("../controllers/itemscontroller");

router.get("/",itemsController.view);
router.get("/additem",itemsController.additem);
router.post("/additem",itemsController.save);
router.get("/updateitem/:id",itemsController.updateitem);



router.post("/updateitem/:id",itemsController.update);
router.get("/deleteitem/:id",itemsController.delete);




module.exports=router;
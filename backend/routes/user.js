const express=require("express")
const router=express.Router();
const userController=require('../controller/user')
const authMiddleware=require("../middlewares/auth")
router.post('/signup',userController.signup);
router.post('/signin', userController.signin)
router.put('/update',authMiddleware.authMiddleware,userController.updateUser)
router.get('/bulk',authMiddleware.authMiddleware,userController.getUser)
module.exports=router;

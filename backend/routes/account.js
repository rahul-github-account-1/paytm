const express =require('express');
const { authMiddleware } = require('../middlewares/auth');
const router=express.Router();
const accountController= require('../controller/account');
router.get('/balance',authMiddleware,accountController.getBalance);

router.post('/transfer',authMiddleware,accountController.transferBalance)

module.exports=router;

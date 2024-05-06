const express = require("express");
const port=3000;
const app=express();
const router= require('./routes/index')
app.use(cors())
app.use(express.json())
app.use('/api/v1',router)


app.listen(port,()=>{
    console.log("app is listening at port "+ port)
})


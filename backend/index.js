const express = require("express");
const port=3000;
const app=express();
const mongoose =require("mongoose")
const cors=require("cors")
const router= require('./routes/index');
const { MONGO } = require("./config");
app.use(cors())
app.use(express.json())
mongoose.connect(MONGO, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
  

app.use('/api/v1',router)


app.listen(port,()=>{
    console.log("app is listening at port "+ port)
})


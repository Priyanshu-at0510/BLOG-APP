const express=require("express");
const app= express();

require("dotenv").config();  // load the configration of env 
const PORT=process.env.PORT || 3000;

//middleware
app.use(express.json());

//import the routes
const blog=require("./routes/blog");
//mount this route
app.use("/api/v1",blog); 


//fetch the database
const connectWithDb=require('./config/database');
connectWithDb(); 

app.get('/',(req,res)=>{
    res.send(`<h1>this is home page baby</h1>`)
})

app.listen(PORT,()=>{
    console.log(`app is started at Port no. ${PORT}`);
});




const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    fs.readdir("./files",(err,files)=>{
        res.render("index",{files:files});
    })
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.name}`,`${req.body.details}`,(err)=>{
        res.redirect("/");
    })
})

app.get("/readmore/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        res.render("fileData",{data:data});
    })
})

app.listen(3000,()=>{
    console.log("server started at port 3000")
})
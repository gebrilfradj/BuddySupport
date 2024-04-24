const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
//conver data into json
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');


app.get("/", (req, res)=> {
  res.render("login");
});



app.get("/signup", (req, res)=> {
  res.render("signup");
});

// register user
app.post("/signup", async (req,res)=>{
  const data ={
    name: req.body.username,
    password: req.body.password
  }

  //check if user exists already
  const existingUser = await collection.findOne({name: data.name});
  if(existingUser){
    res.send("User already exists. Please choose a different username!")
  }else{
    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }


})



//user login

app.post("/login", async (req,res) =>{
  try{
    const check = await collection.findOne({name:req.body.username});
    if(!check){
      res.send("User name not found");
    }

    //compare hash password with regular password
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch){
      res.render("home");
    }else{
      req.send("wrong password");
    }
  }catch{
    res.send("Wrong Details");
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`server running on port: ${port}`)
})

//nice
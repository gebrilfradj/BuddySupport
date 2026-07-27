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

// Request bodies are JSON-parsed, so a client can submit an object such as
// {"$ne": null} where a username is expected. Coercing to a string keeps
// MongoDB query operators out of the filter passed to findOne().
const asString = (value) => (typeof value === 'string' ? value : '');


app.get("/", (req, res)=> {
  res.render("login");
});



app.get("/signup", (req, res)=> {
  res.render("signup");
});

// register user
app.post("/signup", async (req,res)=>{
  const data ={
    name: asString(req.body.username),
    password: asString(req.body.password)
  }

  if(!data.name || !data.password){
    return res.send("Username and password are required.");
  }

  //check if user exists already
  const existingUser = await collection.findOne({name: data.name});
  if(existingUser){
    return res.send("User already exists. Please choose a different username!")
  }

  //hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;
  await collection.insertMany(data);
  return res.redirect("/");
})



//user login

app.post("/login", async (req,res) =>{
  try{
    const username = asString(req.body.username);
    const password = asString(req.body.password);

    const check = await collection.findOne({name: username});
    if(!check){
      return res.send("User name not found");
    }

    //compare hash password with regular password
    const isPasswordMatch = await bcrypt.compare(password, check.password);
    if (isPasswordMatch){
      return res.render("home");
    }
    return res.send("wrong password");
  }catch(error){
    console.error("Login error:", error);
    return res.send("Wrong Details");
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`server running on port: ${port}`)
})

//nice
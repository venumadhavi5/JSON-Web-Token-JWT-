const mongoose = require ("mongoose");
const express = require ("express");
const cors = require ("cors");
const multer = require ("multer");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, 'profilePic');
    },
    filename:  (req, file, cb) => {
      
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(`/profilePic`,express.static(`profilePic`))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

app.post("/signup",upload.array("profilePic"), async (req,res)=>{

   console.log(req.body);
   console.log(req.files);
  // console.log(req.file);

   try {
    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        email:req.body.email,
        password:req.body.password,
        mobileNo:req.body.mobileNo,
        profilePic:req.files[0].path,
        
     });
    
     await User.insertMany([newUser]);
    
       res.json({status:"Success",msg:"User created successfully"});
    
   } catch (error) {
      
    res.json({status:"Failure",msg:"Unable to create account"});
    console.log(error); 
   }

   });

app.post("/login",upload.none(),async(req,res)=>{

    console.log(req.body);

    let userDetailsArr = await User.find().and({email:req.body.email});

    console.log(userDetailsArr);

    if(userDetailsArr.length >0){
        if(userDetailsArr[0].password === req.body.password){

            let token =jwt.sign({email:req.body.email, password:req.body.password},"cartoon")

            let dataToClient = {
                firstName:userDetailsArr[0].firstName,
                lastName:userDetailsArr[0].lastName,
                age:userDetailsArr[0].age,
                email:userDetailsArr[0].email,
                password:userDetailsArr[0].password,
                mobileNo:userDetailsArr[0].mobileNo,
                profilePic:userDetailsArr[0].profilePic,
                token:token,
            };

            res.json({status:"Success",data:dataToClient});

        }else{
            res.json({status:"failure", msg:"Invalid password"});
        }
    }else{
        res.json({status:"failure", msg:"Invalid Email"});
    }
         
    

});

app.post("/validateToken",upload.none(),async(req,res)=>{
    console.log(req.body.token);

    let decryptedToken = jwt.verify(req.body.token,"cartoon");

    console.log(decryptedToken);

    let userDetailsArr = await User.find().and({email:decryptedToken.email});

    console.log(userDetailsArr);

    if(userDetailsArr.length >0){
        if(userDetailsArr[0].password === decryptedToken.password){

            

            let dataToClient = {
                firstName:userDetailsArr[0].firstName,
                lastName:userDetailsArr[0].lastName,
                age:userDetailsArr[0].age,
                email:userDetailsArr[0].email,
                password:userDetailsArr[0].password,
                mobileNo:userDetailsArr[0].mobileNo,
                profilePic:userDetailsArr[0].profilePic,
                
            };

            res.json({status:"Success",data:dataToClient});

        }else{
            res.json({status:"failure", msg:"Invalid password"});
        }
    }else{
        res.json({status:"failure", msg:"Invalid Email"});
    }
});

app.listen(1231,()=>{
    console.log("Listening to port 1231");
});


let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String,

});

let User = new mongoose.model("users",userSchema,"users");
let insertDataToDB = ()=>{
    try {
        let newUser = new User({

            firstName:"Venu",
        lastName:"Madhavi",
        age:25,
        email:"madhavi@gmail.com",
        password:"madhu",
        mobileNo:"7396441322",
        
    
        });
        User.insertMany([newUser]);

        console.log("inserted data into db successfully");
        
    } catch (err) {
        console.log("Unable to insert data into db");
        console.log(err);
    }
    
};




let connectToMDB = async ()=>{
    try {
        mongoose.connect("mongodb+srv://madhavi:divyalahari5@batch2408cluster.k2jcj.mongodb.net/Batch2408?retryWrites=true&w=majority&appName=Batch2408Cluster");

        console.log("Successfully connected to MDB");
        


    } catch (err) {
        console.log("Unable to connect to MDB");
        console.log(err);
    }
};

connectToMDB();


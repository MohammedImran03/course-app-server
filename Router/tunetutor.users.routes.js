import express from "express";
import { client } from "../index.js";
import {
    addnewuser,
  getallusers,
} from "../helper/tunetutor.helper.js";
import { ObjectId } from "mongodb";

const router = express.Router();


//Create User Sign Up
router.post("/addnewuser", async (req, res, next) => {
  const {name,email,password,ph_no,address} = req.body;
  try {
  let userEmail = await client
  .db("tunetutor")
  .collection("userdetails")
  .findOne({ email });
  if (userEmail) {
    return res.status(400).json({
      success: false,
      message: "User already exists Please try to SignUp with different Email account",
    });
  }
  const newuser = await client
  .db("tunetutor")
  .collection("userdetails").insertOne({name,email,password,ph_no,address});
  // sendToken(userEmail, 201, res);     
  // console.log(newuser.insertedId.toString());
  if(newuser.acknowledged){
    const user = {
      _id:newuser.insertedId.toString(),
      name: name,
      email: email,
      password: password,
      ph_no: ph_no,
      address:address,
    };
        return  res.status(201).json({
          data:user,
              success: true,
              message: `Hello ${user.name} Your New account towards Tune Tutor Created Successfully`,
            });
         }else{
          return res.status(404).json({
            success: false,
            message: "New account creation Failed Try again later",
          });
         } 
} catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
}
});

// User Sign In
router.post("/user-Sign-In",async (req, res, next) => {
  const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Login Credentials Missing!",
        });
      }
      const user = await client
      .db("tunetutor")
      .collection("userdetails")
      .findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist!",
        });
      }
      if (user.password!=password) {
        return  res.status(400).json({
          success: false,
          message: "Password Does not Match!, Please Provide Valid Information !",
        });
      }
      return  res.status(200).json({
        success: true,
        message: "Log in Successfull...",
        data:user
      });
      // sendToken(user, 201, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

//Create New Student
// router.post("/addnewuser", async function(req,res){
//     const newuserdata = req.body;
//     console.log(newuserdata); 
//     const result = await addnewuser(newuserdata);
//     res.send(result);
//   });
  
  //to get all users
  router.get("/allusers", async function (req, res) {
    const data = await getallusers();
    res.send(data);
  });


// get  user Details
router.get("/getuser", async (req, res) => {
  try {
    const userid = req.body.userid; 
    const courseid = req.body.courseid;
    console.log(courseid);
    const user = await client
      .db("tunetutor")
      .collection("userdetails")
      .findOne({ _id: new ObjectId(userid) }); 
    const course = await client
      .db("tunetutor")
      .collection("coursedetails")
      .findOne({ _id: new ObjectId(courseid) });
    console.log(user);
    console.log(course);
    if (!user || !course) {
      return res.status(400).json({
        success: false,
        message: "Datas Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      user,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


  
export const tunetutoruserrouter = router;
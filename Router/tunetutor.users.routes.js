import express from "express";
import { client } from "../index.js";
import {
    addnewuser,
  getallusers,
} from "../helper/tunetutor.helper.js";
import { ObjectId } from "mongodb";
import Razorpay from "razorpay";
import crypto from "crypto";
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


// get user Details
router.get("/getuser", async (req, res) => {
  const { userid, courseid } = req.query;
  console.log(userid, courseid);
  try {
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
        message: "Data Not Found!",
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

router.post("/orders",async(req,res)=>{
  try{
const instance=new Razorpay({
  key_id:'rzp_test_1ITMBhQFXyD7lk',
  key_secret:'L6rlQIiMklTNXP7G4ZD1obFV',
});
const options={
  amount:req.body.amount*100,
  currency: "INR",
  receipt:crypto.randomBytes(10).toString("hex")
};
instance.orders.create(options,(error,order)=>{
if(error){
  console.log(error);
 res.status(500).json({
    success: false,
    message: "Some thing Went Wrong",
  });
}
res.status(200).json({
  success: true,
  message: "Payment Success",
  data:order,
});
});
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.post("/verify",async(req,res)=>{
try{
const {
  razorpay_order_id,
razorpay_payment_id,
razorpay_signature
}=req.body;
const sign=razorpay_order_id+"|"+razorpay_payment_id;
const expectedSign=crypto.createHmac("img",'L6rlQIiMklTNXP7G4ZD1obFV').update(sign.toString()).digest("hex");
if(razorpay_signature==expectedSign){
  return res.status(200).json({
    success: true,
    message: "Payment Verified Successfully",
  });
}else{
  return res.status(400).json({
    success: false,
    message: "Invalid Signature Sent!",
  });
}
}catch(error){
  console.log(error);
  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
});

  
export const tunetutoruserrouter = router;
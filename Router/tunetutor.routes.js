import express from "express";
import {
  getallcourses,
  getcoursesbyID,
  addnewCounsell,
  Createnewcourse
} from "../helper/tunetutor.helper.js";
const router = express.Router();

//to get all courses
router.get("/courses", async function (req, res) {
  const data = await getallcourses();
  res.send(data);
});

//to get  courses with id
router.get("/:id", async function (req, res) {
  const {id} = req.params;
  console.log(id);
  try {
    const response = await getcoursesbyID(id);
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Course Details Fetched",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: {},
        message: "No Course Details found!!!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error,
      message: "Internal server error!!!",
    });
  }
});




router.post("/new-course",async (req, res) => {
  try {
      const { 
user_id,
payment_id,
amount,
product_id,
} = req.body;
    const newcourse={
      user_id,
      payment_id,
      amount,
      product_id,
    };
      const result = await Createnewcourse(newcourse);
      console.log(result);
      if (result.acknowledged) {
          res.status(200).json({
              success: true,
              message: "New Course added Successfully.",
            });
      }else{
        return res.status(400).json({
          success: false,
        message: "Unable to Unlock new course, try later.",
      });
      }
      // return next(new ErrorHandler("Unable to create new notes try later.", 400));
    }catch (error) {
      res.status(500).json({ success:false,message: error.message });
    }
});


//Create Counseling
router.post("/addnewcounselling", async function(req,res){
  const counsellingdata = req.body;
  console.log(counsellingdata); 
  const result = await addnewCounsell(counsellingdata);
  res.send(result);
  // console.log(result);
});

// //delete Student with id
// router.delete("/delete/:_id", async function (req, res) {
//   const { _id } = req.params;
//   console.log(_id);
//   const response = await Deletestudentid(_id);
//   res.send(response);
// });



// //Edit Student id
// router.put("/editstudent/:_id", async function(req,res){
//   const {_id} = req.params;
//   const data = req.body;
//   const result = await editstudentid(_id, data);
//   res.send(result);
// });


// //update Student with Mentor id
// router.put("/assignmentor/:_id", async function(req,res){
//   const {_id} = req.params;
//   const menterid = req.body.menterid;
//   const result = await assignmentor(_id, menterid);
//   res.send(result);
// });



export const tunetutorrouter = router;
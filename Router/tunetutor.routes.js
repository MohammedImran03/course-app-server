import express from "express";
import {
  getallcourses,
  getcoursesbyID,
  addnewCounsell,
  Createnewcourse,
  getCourses
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


// Get all Notes for a specific user
router.get("/user-courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCourses(id);
    console.log(result);
    if(result.length==0){
      return  res.status(200).json({
        success: false,
        message: 'You have not Enrolled any Courses',
      });
    }else{
      return  res.status(200).json({
        success: true,
        result
      });
    }
  } catch (error) {
    // res.json({ status: "error", message: error.message });
    res.json({ status: 500 , success:false , message: error.message });
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





export const tunetutorrouter = router;
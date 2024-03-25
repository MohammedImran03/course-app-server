import express from "express";
import {
  getallcourses,
  getcoursesbyID,
  addnewCounsell,
  Createnewcourse,
  CreatenewCoursedetails,
  getCourses,
  getallcousellings,
  getallcourseenrollments,
  updateUserConsellReply,
  DeleteCoursewithId,
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
        result,
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
  if (result.acknowledged) {
    return res.json({
      status: "success",
      success: true,
      message: "New Counselling added",
    });
  }
  res.json({
    success: false,
    status: "error",
    message: "Unable to update Counselling please try again later",
  });
  // console.log(result);
});


router.post("/create-newcoursedetails",async (req, res) => {
  try {
      const { 
        instrument,
        c_title,
        t_name,
        last_update,
        c_fee,
        membership, 
        image_link,
        c_outline,
        objective,
        eligibility,
  } = req.body;
    const newnote={
      instrument,
        c_title,
        t_name,
        last_update,
        c_fee,
        membership, 
        image_link,
        c_outline,
        objective,
        eligibility};
      const result = await CreatenewCoursedetails(newnote);
      console.log(result);
      if (result.acknowledged) {
          res.status(200).json({
              success: true,
              message: "New Course added Successfully.",
            });
      }else{
        return res.status(400).json({
          success: false,
        message: "Unable to add new course, try again later.",
      });
      }
      // return next(new ErrorHandler("Unable to create new notes try later.", 400));
    }catch (error) {
      res.status(500).json({ success:false,message: error.message });
    }
});


router.get("/counselling/allcousellings", async (req, res)=>{
  console.log('counsellingdetails');
  try {
    const result = await getallcousellings();
    return  res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    // res.json({ status: "error", message: error.message });
    res.json({ status: 500 , success:false , message: error.message });
  }
  // res.send(data);
});

router.get("/courses/Courseenrollments", async (req, res)=>{
  console.log('counsellingdetails');
  try {
    const result = await getallcourseenrollments();
    return  res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    // res.json({ status: "error", message: error.message });
    res.json({ status: 500 , success:false , message: error.message });
  }
  // res.send(data);
});


// update notes
router.put("/update-Counsell/:_id",async (req, res) => {

  try {

    const { _id } = req.params;
    console.log(_id)
    const result = await updateUserConsellReply(
      _id);
    console.log(result);
    if (result.acknowledged) {
      return res.json({
        status: "success",
        message: "Counselling Updates Success",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update Counselling Updates please try again later",
    });
  } catch (error) {
    res.json({success: false, status: "error", message: error.message });
  }
});

// update notes
router.put("/update-Counsell/:_id",async (req, res) => {

  try {
    const { _id } = req.params;
    console.log(_id)
    const result = await updateUserConsellReply(
      _id);
    console.log(result);
    if (result.acknowledged) {
      return res.json({
        status: "success",
        success: true,
        message: "Counselling Updates Success",
      });
    }
    res.json({
      status: "error",
      success: false,
      message: "Unable to update Counselling Updates please try again later",
    });
  } catch (error) {
    res.json({success: false, status: "error", message: error.message });
  }
});



//delete Student with id
router.delete("/delete-course/:_id", async function (req, res) {

  try {
    const { _id } = req.params;
    console.log(_id)
    const result = await DeleteCoursewithId(
      _id);
    console.log(result);
    if (result.acknowledged) {
      return res.json({
        success: true,
        status: "success",
        message: "Course Deleted Successfully",
      });
    }
    res.json({
      success: false,
      status: "error",
      message: "Unable to update Courses please try again later",
    });
  } catch (error) {
    res.json({ success: false, status: "error", message: error.message });
  }
});


export const tunetutorrouter = router;
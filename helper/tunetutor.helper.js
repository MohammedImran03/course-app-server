import { client } from "../index.js";
import { ObjectId } from "mongodb";
// import {getmentorbyID} from "./Mentor.js";


//to get all courses data
export async function getallcourses() {
  return await client
    .db("tunetutor")
    .collection("coursedetails")
    .find({})
    .toArray();
}

//Get stuedent by id
export async function getcoursesbyID(id) {
  var oid = new ObjectId(id);
  return await client
  .db("tunetutor")
  .collection("coursedetails")
    .find({ _id: oid })
    .toArray();
}

//Add New user Data
export async function addnewuser(newuserdata) {
  return await client
  .db("tunetutor")
  .collection("userdetails")
    .insertOne(newuserdata);
}

//Add New Counselling
export async function addnewCounsell(newuserdata) {
  return await client
  .db("tunetutor")
  .collection("Counseling")
    .insertOne(newuserdata);
}

//to get all courses data
export async function getallusers() {
  return await client
  .db("tunetutor")
  .collection("userdetails")
  .find({})
  .toArray();
}

// //Delete Student details With Id
// export async function Deletestudentid(id) {
//   // var oid = new ObjectId(id);
//   return await client
//     .db("Mentor-student-assign")
//     .collection("student")
//     .deleteOne({ _id: new ObjectId(id)});
// }



// //Assign Mentor to courses
// export async function assignmentor(_id, menterid) {
//   var oid = new ObjectId(_id);
//   var mentoroid = new ObjectId(menterid);
//   var getmentordetails =await getmentorbyID(menterid);
//   var studentdatachange = await client
//     .db("Mentor-student-assign")
//     .collection("student")
//     .updateOne(
//       { _id: oid },
//       { $set: { mentorassign: true , menterid:getmentordetails }  }
//     );
//     var getstudentdetails=await getcoursesbyID(_id);
//   var mentordatachange = await client
//     .db("Mentor-student-assign")
//     .collection("mentor")
//     .updateMany(
//       { _id: mentoroid },
//       { $set: { studentassigned: true }, $push: { coursesid: getstudentdetails } }
//     );
//   return studentdatachange, mentordatachange;
// }
// //Edit Student data with Id
// export async function editstudentid(_id, data) {
//   var oid = new ObjectId(_id);
//   return await client
//     .db("Mentor-student-assign")
//     .collection("student")
//     .updateOne({ _id: oid }, { $set: data });
// }
// //courses Assigned to Mentors
// export async function getassignedcourses() {
//   return await client
//     .db("Mentor-student-assign")
//     .collection("student")
//     .find({mentorassign: true})
//     .toArray();
// }
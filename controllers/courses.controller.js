// let { courses } = require("../data/courses");
const {  validationResult } = require("express-validator");
const Corse = require("../models/course.modle")






const GetAllCourses =async (req, res) => {
 const courses=await Corse.find();
  
  res.json(courses)
};

const GetCourse = async (req, res) => {
  // const courseId = +req.params.id; //id of the course
  // const course = courses.find((c) => c.id === courseId);
  
     const course = await Corse.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not====== found"); 
  }
  res.json(course);
};

const AddCourse = async(req, res) => {
  console.log(req.body);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);
  const newcourse = new Corse(req.body);// cearate course
  await newcourse.save() //save the course and send it back as a response if saved successfully
  //

  res.status(201).json(newcourse);
};

const UpdateCourse = (req, res) => {
  const courseid = +req.params.id;
  let course = courses.find((c) => c.id === courseid);
  if (!course) {
    return res.status(404).send("Course not found");
  }
  course = { ...course, ...req.body };
  res.status(200).json(course);
};

const DeleteCourse = (req, res) => {
  const courseId = +req.params.id;
  courses = courses.filter((c) => c.id !== courseId);

  res.json({ success: true });
};
module.exports = {
  GetAllCourses,
  GetCourse,
  AddCourse,
  UpdateCourse,
  DeleteCourse,
};

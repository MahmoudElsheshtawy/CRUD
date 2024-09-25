let { courses } = require("../data/courses");
const {  validationResult } = require("express-validator");

const GetAllCourses = (req, res) => {
  res.json(courses);
};

const GetCourse = (req, res) => {
  const courseId = +req.params.id; //id of the course
  const course = courses.find((c) => c.id === courseId); //find the course
  if (!course) {
    return res.status(404).send("Course not found"); //send 404 if course not found
  }
  res.json(course);
};

const AddCourse = (req, res) => {
  console.log(req.body);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);
  res.status(201).json(course);
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

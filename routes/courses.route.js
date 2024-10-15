const express = require("express");
const controller = require("../controllers/courses.controller");
// const { body } = require("express-validator");

const { valadate } = require("../middlewares/valedation");
const verifiyToken = require("../middlewares/verifiyToken");
const router = express.Router();

router
  .route("/")
  .get(controller.GetAllCourses)
  .post(verifiyToken,valadate(),controller.AddCourse);

router
  .route("/:id")
  .get(controller.GetCourse)
  .patch(controller.UpdateCourse)
  .delete(controller.DeleteCourse);

module.exports = router;

const express = require("express");
const controller = require("../controllers/courses.controller");
const { valadate } = require("../middlewares/valedation");
const router = express.Router();

router
  .route("/")
  .get(controller.GetAllCourses)
  .post(valadate ,
    controller.AddCourse
  );

router
  .route("/:id")
  .get(controller.GetCourse)
  .patch(controller.UpdateCourse)
  .delete(controller.DeleteCourse);

module.exports = router;

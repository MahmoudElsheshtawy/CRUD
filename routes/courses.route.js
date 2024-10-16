const express = require("express");
const controller = require("../controllers/courses.controller");
// const { body } = require("express-validator");

const { valadate } = require("../middlewares/valedation");
const verifiyToken = require("../middlewares/verifiyToken");
const userroles = require("../utils/user.rolse");
const allowTo = require("../middlewares/allowTo.JS");
// const allowTo = require("../middlewares/allowTo.JS");
const router = express.Router();

router
  .route("/")
  .get(controller.GetAllCourses)
  .post(verifiyToken,valadate(),allowTo(userroles.MANGER),controller.AddCourse);

router
  .route("/:id")
  .get(controller.GetCourse)
  .patch(controller.UpdateCourse)
  .delete(verifiyToken,allowTo(userroles.ADMIN,userroles.MANGER),controller.DeleteCourse);

module.exports = router;

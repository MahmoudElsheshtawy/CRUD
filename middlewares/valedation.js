const { body } = require("express-validator");

const valadate = () => {
  return [
    body("title")
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please enter a title with at least 2 characters"),
    body("price").notEmpty().withMessage("Please enter a price"),
  ]
};
module.exports = {
  valadate
}

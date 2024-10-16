require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();


const port = 3001;
const Status = require("./utils/Status");





const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("Connected to the database!")
});
app.use(cors()); //for frontend

app.use(express.json());
// mongoose.connect(url).then(() => [console.log("Connected to the database!")]);


const CoursesRouter = require("./routes/courses.route");
const UsersRouter  = require("./routes/user.route");

app.use("/api/courses", CoursesRouter);
app.use("/api/users", UsersRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({ message: " / Page not found" }); // 404 Not Found
});
// global error handler

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status: error.statusText || Status.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})


app.listen(port,() => {
  console.log(`Example app listening on port ${port}`);
});

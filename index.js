const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors()) //for frontend
const port = 3001;
const Status = require("./utils/Status");


// const MONGO_URL = require(" MONGO_URL");
// mongoooooooooose
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => [console.log("Connected to the database!")]);

const CoursesRouter = require("./routes/courses.route");

app.use("/api/courses", CoursesRouter);
app.all( '*' ,(req, res) =>{
  res.status(404).json({ message: "Page not found" });  // 404 Not Found
})
// global error handler
app.use((error ,req,res,next)=>{
//  res.json(err)
  res.status( 500).json({ status: Status.ERROR, message: error.message });
});

// app.use((err ,req,res,next)=>{
//   console.error(err.message);
//   res.status(500).json({status :Status.ERROR, message: err.message }); // 500 Internal Server Error
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

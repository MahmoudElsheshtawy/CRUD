const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;

const CoursesRouter = require('./routes/courses.route')

app.use('/api/courses', CoursesRouter)





app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);
});

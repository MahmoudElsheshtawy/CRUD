const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
// mongoooooooooose
const mongoose = require('mongoose');
const url = 'mongodb+srv://elsheshtawy:eljoker123@lern-mongodb.p48m6.mongodb.net/node?retryWrites=true&w=majority&appName=lern-MongoDb';

mongoose.connect(url).then(()=>[
  console.log('Connected to the database!')
])











const CoursesRouter = require('./routes/courses.route')

app.use('/api/courses', CoursesRouter)





app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);
});

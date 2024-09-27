const mongoose = require('mongoose');

const courseSchema =new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
   
})

// Export the model of course. This will be used to interact with the database.  'Corse' is the name of the collection in the database and courseSchema is the structure of the documents in the collection.  'course' is the singular name of the model.  'courses' is the plural name of the model.  'mongoose.model' is a function provided by Mongoose that creates a model from a schema and a collection name.  The first argument is the
module.exports= mongoose.model('Corse' ,courseSchema)
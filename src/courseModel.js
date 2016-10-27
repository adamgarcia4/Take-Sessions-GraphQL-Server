var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Circumvents the "Cannot recompile schema" error
const CourseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    genre: String,
    pic: String,
    price: Number,
    calendarID: String,
    bio: String,
    location: String,
    material: String,
    teachers: [String],
    courseGroups: [String]
});


module.exports = mongoose.model('Course', CourseSchema);
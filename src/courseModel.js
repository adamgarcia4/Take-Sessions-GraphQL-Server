var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
    _id: String,
    name: String
});

module.exports = mongoose.model('Course', CourseSchema);
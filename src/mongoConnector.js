//**************Imports***************

// import Mongoose from 'mongoose';

var mongoose = require('mongoose');
import Promise from 'bluebird';
var Course = require('./courseModel');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
var uuid = require('node-uuid');


// console.log('woot');
// var test = Course.findOne({ '_id': 'C1' }, function (err, data) {
//     console.log('hi?');
//     if (err) {
//         console.error('error is: ', err);
//     } else {
//         console.log('data is: ', data);
//     }

// });

// console.log('test', test);

export class MongoDBConnector {

    //Initialize DB Connection
    constructor() {

    }

    connectToDB() {
        // Connects to database.  If connection already, do not attempt to connect
        // TODO: need to pass in URI later
        
        const mongo = mongoose.connect('mongodb://adamgarcia4:Grimmick15@ds049476.mlab.com:49476/graphql-backend', (err) => {
            if (err) {
                console.error('Could not connect to MongoDB on port _____');
            } else {
                console.log('woo');
            }
        });
    }

    setSchema(reqSchema) {
        this.schema = reqSchema;
    }

    putData(newObject) {
        this.connectToDB();
        console.log('we inside!');


        var newCourse = new this.schema({
            _id: uuid.v4(),
            name: "Adam",
        })


        console.log('new course', newCourse);
        newCourse.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('we win');
            }
        })
    }

    // getOne(queryParam) {
    //     Course.findOne({ '_id': 'C1' }, function (err, data) {
    //         if (err) {
    //             console.error('error is: ', err);
    //         }
    //         console.log('data is: ', data);
    //     })
    // }

    getList() {
        // const CourseSchema = new Schema({
        //     _id: String,
        //     name: String,
        //     genre: String,
        //     pic: String,
        //     price: Number,
        //     calendarID: String,
        //     bio: String,
        //     location: String,
        //     material: String,
        //     teachers: [String],
        //     courseGroups: [String]
        // });

        // const Course = mongoose.model('Course', CourseSchema);

        // var locThis = this;

        return new Promise(function (resolve, reject) {
            console.log('course schema', Course);
            console.log('hi');
            // mongo.once('open', function () {
            Course.findById({ _id: "C1" }, function (err, courses) {
                console.log('err: ', err);
                console.log('courses: ', courses);
                if (err) {
                    return reject(new Error("Could not get courses"));
                }
                else {
                    console.log('courses are: ', courses);
                    return resolve(courses);
                }
            });
            // })


        });

    }
}
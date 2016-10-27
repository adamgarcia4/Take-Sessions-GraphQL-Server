

//**************Imports***************

// Utilizes Mongoose for MongoDB ORM
var mongoose = require('mongoose');


// Utilizes Bluebird promises for Async Nature
import Promise from 'bluebird';
mongoose.Promise = Promise; //Some Mongoose functions return promises


// Random Number Generator for IDs
var uuid = require('node-uuid');

export class MongoDBConnector {

    constructor() {

    }

    // Connects to database.  Call before every I/O Operation
    connectToDB() {
        // TODO: need to pass in URI later

        //If MongoDB Connection is disconnected
        if (mongoose.connection.readyState == 0) {
            
            //Creates Connection
            const mongo = mongoose.connect('mongodb://adamgarcia4:Grimmick15@ds049476.mlab.com:49476/graphql-backend', (err) => {
                if (err) {
                    console.error('Could not connect to MongoDB.');
                } else {
                    console.log('Connection Succeeded.');
                }
            });
        }
    }

    // Import respective Model's Schema.  Abstracted to use across Models.
    // TODO: There will be a problem when going from 1-2 models.  Either Lookup table or object input with all models
    setSchema(reqSchema) {
        // console.log(reqSchema);
        this.schema = reqSchema;
    }

    //Used to store data
    putData(newObject) {

        //Needed because promise creates a closure
        var outerThis = this;
        
        return new Promise(function (resolve, reject) {
            
            //ensure a connection is established before attempting a save
            outerThis.connectToDB();

            //Give Object a randomly-generated ID
            newObject["_id"] = uuid.v4();
            
            var newModel = new outerThis.schema(newObject);
            console.log(newModel);

            newModel.save(function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(new Error("Could not save properly."));
                } else {
                    return resolve(result);
                }
            })
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
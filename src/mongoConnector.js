

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
    // TODO: wrap in a promise to do .then
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

        var outerThis = this;

        return new Promise(function(resolve, reject) {

            outerThis.connectToDB();

            var model = mongoose.model('Course', outerThis.schema);

            //.lean() converts the find results to pure JSON objects instead of Mongoose Objects
            model.find({ }).lean().exec(function(err, docs) {
                if(err) {
                    console.log(err);
                    return reject(new Error("Could not find properly."));
                } else {
                    // console.log(docs);
                    // console.log('type: ', typeof docs, docs);
                    // var arr = [docs];
                    // console.log('typeof: ', typeof arr);
                    // arr.forEach(function(entry) {
                    //     console.log('typeof!: ', typeof entry, entry);
                    //     // console.log(entry._id);
                    // });
                    return resolve(docs);
                }
            });
        });
    }
}
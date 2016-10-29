

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
        // this.modelList = modelList;
        this.modelList = {};
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
    pushModel(model) {
        // console.log(reqSchema);
        var modelName = Object.keys(model)[0];
        console.log(modelName);
        // console.log(model[modelName]);
        this.modelList[modelName] = model[modelName];
        // console.log(this.modelList);
        // Object.keys(model);// = model;
    }

    //Used to store data
    putData(modelName, newObject) {

        //Needed because promise creates a closure
        var outerThis = this;

        return new Promise(function (resolve, reject) {

            //ensure a connection is established before attempting a save
            outerThis.connectToDB();

            //Give Object a randomly-generated ID
            newObject["_id"] = uuid.v4();

            var newModel = new outerThis.modelList[modelName](newObject);
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

    getList(modelName) {

        var outerThis = this;

        return new Promise(function (resolve, reject) {

            outerThis.connectToDB();

            // var model = mongoose.model('Course', outerThis.model);
            // console.log()
            //.lean() converts the find results to pure JSON objects instead of Mongoose Objects
            outerThis.modelList[modelName].find({}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    return reject(new Error("Could not find properly."));
                } else {
                    return resolve(docs);
                }
            });
        });
    }
    // getOne(queryParam) {
    //     Course.findOne({ '_id': 'C1' }, function (err, data) {
    //         if (err) {
    //             console.error('error is: ', err);
    //         }
    //         console.log('data is: ', data);
    //     })
    // }
    getById(modelName, _id) {

        var outerThis = this;

        return new Promise(function (resolve, reject) {

            outerThis.connectToDB();

            // var model = mongoose.model('Course', outerThis.model);

            //.lean() converts the find results to pure JSON objects instead of Mongoose Objects
            outerThis.modelList[modelName].findById(_id).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    return reject(new Error("Could not find properly."));
                } else {
                    return resolve(docs);
                }
            });
        });
    }

    // getByCustom(inputFindQuery) {
    //     var outerThis = this;

    //     return new Promise(function (resolve, reject) {

    //         outerThis.connectToDB();
    //         console.log('woot');
    //         // var model = mongoose.model('Course', outerThis.model);

    //         //.lean() converts the find results to pure JSON objects instead of Mongoose Objects
    //         outerThis.model.find(inputFindQuery, {lean: true}, function (err, docs) {
    //             if (err) {
    //                 console.log(err);
    //                 return reject(new Error("Could not find properly."));
    //             } else {
    //                 console.log('docs: ', typeof docs, docs);
    //                 return resolve(docs);
    //             }
    //         });
    //     });
    // }

}
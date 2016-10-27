
// Imports
var uuid = require('node-uuid');
var mongooseSchema = require('../courseModel');

export class Course {
    constructor({ connector }) {
        this.connector = connector;
        this.connector.setSchema(mongooseSchema);        
    }

    getList() {
        //Add any validation here

        // return this.connector.getDataList('Course');
        return this.connector.getList();
    }

    getById(_id) {
        return this.connector.getBatchData('Course', _id);
    }

    create(course) {
        
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            
            resolve(testThis.connector.putData(course));
        });
    }
}
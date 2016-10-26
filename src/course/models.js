
// Imports
var uuid = require('node-uuid');


export class Course {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here

        return this.connector.getDataList('Course');
    }

    getById(_id) {
        return this.connector.getBatchData('Course', _id);
    }

    create(course) {
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            // console.log('before', course);
            
            // Adds a random ID to the model
            course["_id"] = uuid.v4();
            
            // console.log('after', course);
            resolve(testThis.connector.putData('Course', course));
        });
    }
}
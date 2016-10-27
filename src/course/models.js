
//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class Course {
    constructor({ connector }) {
        this.connector = connector;
        this.connector.setSchema(mongoModel);
    }

    getList() {
        //Add any validation here

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
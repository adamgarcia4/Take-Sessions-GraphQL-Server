
//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class Student {
    constructor({ connector }) {
        connector.pushModel({ 'Student': mongoModel });
        this.connector = connector;

        // this.connector = connector;
        // this.connector.setModel(mongoModel);
    }

    getList() {
        //Add any validation here

        return this.connector.getList('Student');
    }


    getById(_id) {
        return this.connector.getById('Student', _id);
        // return this.connector.getByCustom({'_id': _id});
    }

    // getByName(_id) {
    //     return this.connector.getByCustom({'_id': _id});
    // }

    create(course) {

        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {

            resolve(testThis.connector.putData('Student', course));
        });
    }

    update(_id, studentAttr) {
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {

            resolve(testThis.connector.updateData('Student', _id, studentAttr));
        });
    }
}

//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class Teacher {
    constructor({ connector }) {
        connector.pushModel({ 'Teacher': mongoModel });
        this.connector = connector;

        // this.connector = connector;
        // this.connector.setModel(mongoModel);
    }

    getList() {
        //Add any validation here

        return this.connector.getList('Teacher');
    }


    getById(_id) {
        return this.connector.getById('Teacher', _id);
        // return this.connector.getByCustom({'_id': _id});
    }

    // getByName(_id) {
    //     return this.connector.getByCustom({'_id': _id});
    // }

    create(course) {

        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {

            resolve(testThis.connector.putData('Teacher', course));
        });
    }

    update(_id, teacherAttr) {
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {

            resolve(testThis.connector.updateData('Teacher', _id, teacherAttr));
        });
    }
}
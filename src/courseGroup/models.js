
//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class CourseGroup {
    constructor({ connector }) {
        connector.pushModel({ 'CourseGroup': mongoModel });
        this.connector = connector;

        // this.connector = connector;
        // this.connector.setModel(mongoModel);
    }

    getList() {
        //Add any validation here

        return this.connector.getList('CourseGroup');
    }


    getById(_id) {
        return this.connector.getById('CourseGroup', _id);
        // return this.connector.getByCustom({'_id': _id});
    }

    // getByName(_id) {
    //     return this.connector.getByCustom({'_id': _id});
    // }

    create(courseGroup) {

        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            // console.log(courseGroup);
            resolve(testThis.connector.putData('CourseGroup', courseGroup));
        });
    }

    update(_id, courseGroupAttr) {
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {

            resolve(testThis.connector.updateData('CourseGroup', _id, courseGroupAttr));
        });
    }
}
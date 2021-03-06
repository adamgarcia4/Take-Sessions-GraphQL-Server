
//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class Course {
    constructor({ connector }) {
        connector.pushModel({'Course': mongoModel});
        this.connector = connector;

        // this.connector = connector;
        // this.connector.setModel(mongoModel);
    }

    getList() {
        //Add any validation here

        return this.connector.getList('Course');
    }


    getById(_id) {
        return this.connector.getById('Course', _id);
        // return this.connector.getByCustom({'_id': _id});
    }

    // getByName(_id) {
    //     return this.connector.getByCustom({'_id': _id});
    // }

    create(course) {
        
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            
            resolve(testThis.connector.putData('Course', course));
        });
    }

    update(_id, courseAttr) {
        console.log('inside update');
        console.log('_id: ',_id);
        console.log('courseAttr: ', courseAttr);
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            
            resolve(testThis.connector.updateData('Course', _id, courseAttr));
        });
    }
}
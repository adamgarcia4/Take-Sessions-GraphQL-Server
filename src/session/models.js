
//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class Session {
    constructor({ connector }) {
        connector.pushModel({ 'Session': mongoModel });
        this.connector = connector;

        // this.connector = connector;
        // this.connector.setModel(mongoModel);
    }

    getList() {
        //Add any validation here

        return this.connector.getList('Session');
    }


    getById(_id) {
        return this.connector.getById('Session', _id);
        // return this.connector.getByCustom({'_id': _id});
    }

    // getByName(_id) {
    //     return this.connector.getByCustom({'_id': _id});
    // }

    create(session) {

        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            // console.log(course);
            resolve(testThis.connector.putData('Session', session));
        });
    }

    update(_id, sessionAttr) {
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {

            resolve(testThis.connector.updateData('Session', _id, sessionAttr));
        });
    }
}
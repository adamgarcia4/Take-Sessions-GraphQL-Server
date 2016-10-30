
//**************Imports***************

var uuid = require('node-uuid');
// var mongooseSchema = require('../courseModel');
import { mongoModel } from './schema';

export class Payment {
    constructor({ connector }) {
        connector.pushModel({'Payment': mongoModel});
        this.connector = connector;

        // this.connector = connector;
        // this.connector.setModel(mongoModel);
    }

    getList() {
        //Add any validation here

        return this.connector.getList('Payment');
    }


    getById(_id) {
        return this.connector.getById('Payment', _id);
        // return this.connector.getByCustom({'_id': _id});
    }

    // getByName(_id) {
    //     return this.connector.getByCustom({'_id': _id});
    // }

    create(payment) {
        
        //Needed because the promise creates a closure.
        var testThis = this;

        return new Promise(function (resolve, reject) {
            // console.log(course);
            resolve(testThis.connector.putData('Payment', payment));
        });
    }
}
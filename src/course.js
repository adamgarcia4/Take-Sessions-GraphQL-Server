// Imports
var uuid = require('node-uuid');
import { // This contains all calls to be made to DynamoDB
    // getDataList, //TODO: Get Caching working on Data List
    // getBatchData,
    putData
    // updateData
} from './dynamodb';


export function createCourse(course) {
    return new Promise(function (resolve, reject) {
        console.log('before', course);
        course["_id"] = uuid.v4();
        console.log('after', course);
        resolve(putData('Course', course));
    });
}


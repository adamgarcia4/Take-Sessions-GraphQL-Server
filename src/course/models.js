// import { // This contains all calls to be made to DynamoDB
// 	getDataList, //TODO: Get Caching working on Data List
// 	getBatchData,
// 	putData,
// 	updateData
// } from '../dynamodb';

export class Course {
    constructor({ connector }) {
        this.connector = connector;
    }

    getCourseList() {
        //Add any validation here
        console.log(typeof(this.connector));
        return this.connector.getDataList('Course');
    }
}
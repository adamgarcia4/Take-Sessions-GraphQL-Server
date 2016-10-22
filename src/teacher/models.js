


export class Teacher {
    constructor({ connector }) {
        this.connector = connector;
    }

    getTeacherList() {
        //Add any validation here
        
        return this.connector.getDataList('Teacher');
    }
}
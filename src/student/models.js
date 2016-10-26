


export class Student {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here
        
        return this.connector.getDataList('Student');
    }

    getById(id) {
        return this.connector.getBatchData('Student', id);
    }
}
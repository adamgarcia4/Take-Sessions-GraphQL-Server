


export class Teacher {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here
        
        return this.connector.getDataList('Teacher');
    }

    getById(id) {
        return this.connector.getBatchData('Teacher', id);
    }
}
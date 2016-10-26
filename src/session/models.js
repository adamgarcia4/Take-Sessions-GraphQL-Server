


export class Session {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here
        
        return this.connector.getDataList('Session');
    }

    getById(id) {
        return this.connector.getBatchData('Session', id);
    }

    //create
}
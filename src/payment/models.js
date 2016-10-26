


export class Payment {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here
        
        return this.connector.getDataList('Payment');
    }

    getById(id) {
        return this.connector.getBatchData('Payment', id);
    }

    //create
}
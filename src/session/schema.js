
// This is the Schema for the Session
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


export const Session = `
    type Session {
        _id: String!
        payments: [Payment]
    }
`;

export const SessionInput = `
    input SessionInput {
        payments: [String]
    }
`;

export const resolvers = {
    Session: {
        payments(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Payment.getById(root.paymentID);
        }
    }
}

const mongoSchema = new mongoose.Schema({
    _id: String,
    payments: [String]
});

export const mongoModel = mongoose.model('Session', mongoSchema);
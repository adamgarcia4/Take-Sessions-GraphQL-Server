
// This is the Schema for the Payment
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



export const Payment = `
    type Payment {
        _id: String!
        session: Session
    }
`;

export const PaymentInput = `
    input PaymentInput {
        session: String
    }
`;

export const resolvers = {
    Payment: {
        session(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Session.getById(root.sessionID);
        }
    }
}

const mongoSchema = new mongoose.Schema({
    _id: String,
    session: String
});

export const mongoModel = mongoose.model('Payment', mongoSchema);
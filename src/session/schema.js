


export const Session = `
    type Session {
        _id: String!
        # payments: [Payment]
    }
`;

export const resolvers = {
    Session: {
        payments(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Payment.getById(root.userID);
        }
    }
}
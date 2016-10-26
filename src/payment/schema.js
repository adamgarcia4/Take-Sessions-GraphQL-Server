


export const Payment = `
    type Payment {
        _id: String!
        session: Session
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
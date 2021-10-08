const resolvers = {
    Query: {
        rooms: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getRooms(),
        room: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getRoomById(args.id),
        roomByName: async (parent, args, {mongoDataMethods}) => {
            const rooms = await mongoDataMethods.getRooms({name: 'abc'});
            return rooms[0]
        },
        users: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getUsers(),
        user: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getUserById(args.id),
        userByName: async (parent, args, {mongoDataMethods}) => {
            const user = await mongoDataMethods.getUsers({name: args.name});
            return user[0];
        },
        messages: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getMessages(),
        message: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getMessageById(args.id),
        messageByName: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getMessages({name: args.name})[0],
    },
    Room: {
        users: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getUsers({currentRoomId: parent.id}),
        messages: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getMessages({receiverId: parent.id})
    },
    User: {
        messages: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getMessages({senderId: parent.id}),
        room: async (parent, args , {mongoDataMethods}) => {
            return await mongoDataMethods.getRoomById(parent.roomId)
        } 
    },
    Message: {
        sender: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getUserById(parent.senderId),
        receiver: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getRoomById(parent.receiverId)
    },
    // MUTATION 
    Mutation: {
        createRoom: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.createRoom(args),
        createUser: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.createUser(args),
        createMessage: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.createMessage(args)
    }
}
module.exports = resolvers
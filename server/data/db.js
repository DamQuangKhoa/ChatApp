const Message = require("../models/Message")
const Room = require("../models/Room")
const User = require("../models/User")

const mongoDataMethods = {
    getRooms: async (condition = null) => condition === null? await Room.find(): await Room.find(condition),
    getRoomById: async (id) =>  await Room.findById(id),
    getUsers: async (condition = null) => condition === null? await User.find(): await User.find(condition),
    getUserById: async (id) =>  await User.findById(id),
    getMessages: async (condition = null) => condition === null? await Message.find(): await Message.find(condition),
    getMessageById: async (id) =>  await Author.findById(id),
    createRoom: async args => {
        const newRoom = new Room(args);
        return await newRoom.save();
    },
    createUser: async args => {
        const newUser = new User(args);
        return await newUser.save();
    },
    createMessage: async args => {
        const newMessage = new Message(args);
        return await newMessage.save();
    },
}

module.exports = mongoDataMethods;
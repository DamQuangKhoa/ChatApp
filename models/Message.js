const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    }
})

module.exports = mongoose.model('message', MessageSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('room', RoomSchema);
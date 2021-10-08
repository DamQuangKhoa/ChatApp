const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Room {
        id: ID!, 
        name: String!,
        users: [User],
        messages: [Message]
    }
    type User {
        id: ID! # required
        name: String!,
        room: Room,
        messages: [Message]
    }
    type Message {
        id: ID! # required
        content: String,
        sender: User,
        receiver: Room
    }
    # Root Types
    type Query {
        rooms: [Room]
        room (id: ID!): Room # not null
        roomByName(name: String!): Room
        users: [User]
        user (id: ID!): User # not null
        userByName (name: String!): User # not null
        messages: [Message]
        message (id: ID!): Message # not null
        messageByName (name: String!): Message # not null
    }

    type Mutation {
        createRoom(name: String!): Room
        createUser(name: String!, roomId: ID!): User
        createMessage(content: String, senderId: ID!, receiverId: ID!): Message
    }
`

module.exports = typeDefs;
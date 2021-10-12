const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema/schema');
const mongoose = require('mongoose');
const mongoDataMethods = require('./data/db');
const resolvers = require('./resolver/resolver');


// Load Schema & resolvers
async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({mongoDataMethods}) });
    await server.start();

    const app = express();

    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
    });

    server.applyMiddleware({ app })

    app.listen({ port: process.env.PORT || 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}
const connectDB = async () => {
    try {
        //TODO: Add to ENV 
        await mongoose.connect('mongodb+srv://ted:1@cluster0.pesoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
        })
        console.log('Mongo DB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();
startApolloServer(typeDefs, resolvers);

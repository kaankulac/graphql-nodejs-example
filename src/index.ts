import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import connectDB from './database';
import dotenv from 'dotenv';
dotenv.config();

// connect mongoDb
connectDB();

// create apollo server
const server = new ApolloServer({
    schema
})

// create express app
export const app = express();

export async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // start server
    app.listen(process.env.PORT, async () => {
        console.log(`Server started on http://localhost:${process.env.PORT}/${server.graphqlPath}`)
    })
}

startServer();


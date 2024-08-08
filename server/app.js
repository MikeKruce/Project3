const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
require('dotenv').config();

const app = express();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
});

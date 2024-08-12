import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',  // Update this to your GraphQL server's URL
});

// Set up an authentication link (optional, needed for JWT)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');  // Assuming you're storing JWT in localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

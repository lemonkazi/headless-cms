import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

//if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
//}
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', // Replace with your WordPress GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;

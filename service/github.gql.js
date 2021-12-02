import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export default client;

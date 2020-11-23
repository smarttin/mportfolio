import React from 'react';
import withApollo from 'next-with-apollo';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import moment from 'moment';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('portfolio_token');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience({ startDate, endDate }, args, { cache }) {
            let now = moment().unix();

            if (endDate) {
              now = endDate / 1000;
            }

            return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
          },
        },
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);

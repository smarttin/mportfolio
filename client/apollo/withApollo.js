import React from 'react';
import withApollo from 'next-with-apollo';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import moment from 'moment';

const httpLink = createHttpLink({
  uri: process.env.BASE_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  // const token = Cookies.get('portfolio_token');
  // console.log('token from cookie:', token);
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
    },
    fetchOptions: {
      credentials: 'include',
    },
  }));
  return forward(operation);
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: authLink.concat(httpLink),
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

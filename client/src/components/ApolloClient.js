//import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';
import {from, ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";

import { setContext } from '@apollo/client/link/context';

import { GraphQLClient } from 'graphql-request';
import { GetCartDocument } from './graphql'

// Session Token Management.
async function fetchSessionToken() {
  let sessionToken;
  try {
    const graphQLClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT);

    const cartData = await graphQLClient.request(GetCartDocument);

    // If user doesn't have an account return accountNeeded flag.
    sessionToken = cartData?.cart?.sessionToken;

    if (!sessionToken) {
      throw new Error('Failed to retrieve a new session token');
    }
  } catch (err) {
    console.error(err);
  }

  return sessionToken;
}
export async function getSessionToken(forceFetch = false) {
  let sessionToken;

  // Check if localStorage is available (i.e., if the code is running in a browser).
  if (typeof localStorage !== 'undefined') {
    sessionToken = localStorage.getItem(process.env.SESSION_TOKEN_LS_KEY);
  }
	if (!sessionToken || forceFetch) {
    sessionToken = await fetchSessionToken();
  }
  return sessionToken;
}
function createSessionLink() {
  return setContext(async (operation) => {
    const headers = {};
    const sessionToken = await getSessionToken();
    if (sessionToken) {
      headers['woocommerce-session'] = `Session ${sessionToken}`;

      return { headers };
    }

    return {};
  });
}
/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink( ( operation, forward ) => {
	/**
	 * If session data exist in local storage, set value as session header.
	 */
	const session = ( process.browser ) ?  localStorage.getItem( "woo-session" ) : null;

	if ( session ) {
		operation.setContext( ( { headers = {} } ) => ( {
			headers: {
				"woocommerce-session": `Session ${ session }`
			}
		} ) );
	}

	return forward( operation );

} );

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink( ( operation, forward ) => {

	return forward( operation ).map( response => {

		if ( !process.browser ) {
			return response;
		}

		/**
		 * Check for session header and update session in local storage accordingly.
		 */
		const context = operation.getContext();
		const { response: { headers } }  = context;
		const session = headers.get( "woocommerce-session" );

		if ( session ) {

			// Remove session data if session destroyed.
			if ( "false" === session ) {

				localStorage.removeItem( "woo-session" );

				// Update session new data if changed.
			} else if ( localStorage.getItem( "woo-session" ) !== session ) {

				localStorage.setItem( "woo-session", headers.get( "woocommerce-session" ) );

			}
		}

		return response;

	} );
} );
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});
// Apollo GraphQL client.
const client = new ApolloClient({
	link: middleware.concat( afterware.concat( createHttpLink({
		uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
		//fetch: fetch
	}) ) ),
	cache: new InMemoryCache(),
});
// const client = new ApolloClient({
//   link: from([
//     createSessionLink(),
//     //createErrorLink(),
//     //createUpdateLink(),
//     new HttpLink({ uri: 'http://localhost:8080/graphql' }),
//   ]),
//   cache: new InMemoryCache(),
// });
//createSessionLink()
// const client = new ApolloClient({
//   uri: 'http://localhost:8080/graphql', // Replace with your WordPress GraphQL endpoint
//   cache: new InMemoryCache(),
// });
export default client;

import { gql } from '@apollo/client';

export const GetCartDocument = gql`
  query {
    customer {
      sessionToken
    }
  }
`;
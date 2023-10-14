// queries.js
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      nodes {
        id
        name
        price
        # Add more fields you need
      }
    }
  }
`;

// Add more queries for different data you want to fetch

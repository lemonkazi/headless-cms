// ProductList.js
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries.js'; // Import your GraphQL query
import client from '../../apolloClient'; // Import your Apollo Client configuration

function ProductList() {
  // const { loading, error, data } = useQuery(GET_PRODUCTS, { client });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  //const products = data.products.nodes;

  return (
    <div>
      <h1>WooCommerce Products</h1>
      <ul>
        {/* {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default ProductList;

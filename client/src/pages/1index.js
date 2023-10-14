import Layout from "../../src/components/Layout";
import ProductList from "./ProductList";
//import client from '../components/ApolloClient';

export default function Home (props) {

	const { } = props || {};

	return (
			<Layout>
				<ProductList/>
			</Layout>
	)
};

export async function getStaticProps () {

	// const { data } = await client.query( {
	// 	query: PRODUCTS_AND_CATEGORIES_QUERY,
	// } );

	return {
		props: {
		},
		revalidate: 1
	}

};

import createAlphanumericOrderer from './create-alphanumeric-orderer';

/**
 * A "do nothing" function that won't sort data
 */
function identity(response) {
	return response;
}

/**
 * Return a sorting function based on the type of the order
 *
 * @param {"ascending" | "descending" | undefined} order
 * @return {<T>(documents: T) => T} A sorting function
 */
function getOrderingFunction(order = {}) {
	const { type } = order;
	switch (type) {
		case 'ascending':
			return createAlphanumericOrderer(false);
		case 'descending':
			return createAlphanumericOrderer(true);
		default:
			return identity;
	}
}

export default getOrderingFunction;

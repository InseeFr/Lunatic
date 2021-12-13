import createAlphanumericOrderer from './create-alphanumeric-orderer';

function identity(response) {
	return response;
}

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

function identity(response) {
	return response;
}

function ascending(response, order = {}) {
	const { field } = order;

	if (field && Array.isArray(response)) {
		return response.sort(function (a, b) {
			if (field in a.suggestion && field in b.suggestion) {
				if (a.suggestion[field] > b.suggestion[field]) {
					return 1;
				} else if (a.suggestion[field] < b.suggestion[field]) {
					return -1;
				}
			}
			return 0;
		});
	}
	return response;
}

function getOrderingFunction(order = {}) {
	const { type } = order;
	switch (type) {
		case 'ascending':
			return ascending;
		default:
			return identity;
	}
}

export default getOrderingFunction;

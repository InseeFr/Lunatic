function createAlphanumericOrderer(descending = false) {
	return function ascending(response, order = {}) {
		const { field } = order;

		if (field && Array.isArray(response)) {
			return response.sort(function (a, b) {
				if (field in a.suggestion && field in b.suggestion) {
					if (a.suggestion[field] > b.suggestion[field]) {
						return descending ? -1 : 1;
					} else if (a.suggestion[field] < b.suggestion[field]) {
						return descending ? 1 : -1;
					}
				}
				return 0;
			});
		}
		return response;
	};
}
export default createAlphanumericOrderer;

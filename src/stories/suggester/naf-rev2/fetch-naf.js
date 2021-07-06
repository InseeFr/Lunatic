/**
 * The way to fetch data. Each entity have an ID!
 * It for dealing with the append worker.
 * It also could be paged web service.
 */
async function fetchNaf(path = '') {
	const response = await fetch(`${path}/naf-rev2.json`);
	const naf = await response.json();
	return Object.values(naf).map(function (rubrique) {
		const { code } = rubrique;
		return { ...rubrique, id: code };
	});
}

function splitArray(array, size = 100) {
	return array
		.reduce(
			function (stack, entity) {
				const [last, ...other] = stack;
				if (last.length < size) {
					return [[...last, entity], ...other];
				}
				return [[entity], last, ...other];
			},
			[[]]
		)
		.reverse();
}

const createNextPage = (pages) => (index) => {
	if (index < pages.length - 1) {
		return {
			entities: pages[index],
			next: async () => createNextPage(pages)(index + 1),
		};
	}
	return { entities: pages[index] };
};

/**
 * Mock REST service.
 * @param {} path
 */
export async function createFetchNafPaged(path) {
	const naf = await fetchNaf(path);
	const pages = splitArray(naf).map(function (e) {
		const { code: id } = e;
		return { ...e, id };
	});

	return function () {
		return createNextPage(pages)(0);
	};
}

export default fetchNaf;

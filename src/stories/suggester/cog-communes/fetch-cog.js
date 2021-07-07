async function fetchCOG(path = '') {
	const response = await fetch(`${path}/communes-2019.json`);
	const cog = await response.json();
	return cog.map(function (commune, i) {
		const { com } = commune;
		return { ...commune, id: `${com}-${i}` };
	});
}

export default fetchCOG;

async function fetchBailleurs(path = '') {
	const sbPath =
		process.env.NODE_ENV === 'development'
			? `${path}/bailleurs-sociaux.json`
			: `/Lunatic/storybook/bailleurs-sociaux.json`;
	const response = await fetch(sbPath);
	const naf = await response.json();
	return naf.map(function (bailleur) {
		const { code, libelle1 } = bailleur;

		return { ...bailleur, id: code, label: libelle1, value: code };
	});
}

export default fetchBailleurs;

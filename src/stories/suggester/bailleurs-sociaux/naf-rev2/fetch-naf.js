async function fetchBailleurs() {
	const sbPath =
		process.env.NODE_ENV === 'development'
			? `${path}/bailleurs-sociaux.json`
			: `/Lunatic/storybook/bailleurs-sociaux.json`;
	const response = await fetch(sbPath);
	const naf = await response.json();
	return naf;
}

export default fetchBailleurs;

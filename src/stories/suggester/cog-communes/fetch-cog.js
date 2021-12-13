async function fetchCOG(path = '') {
	const sbPath =
		process.env.NODE_ENV === 'development'
			? `${path}/communes-2019.json`
			: `/Lunatic/storybook/communes-2019.json`;
	const response = await fetch(sbPath);
	const cog = await response.json();

	return cog.map(({ label, ...rest }) => ({
		label,
		...rest,
	}));
}

export default fetchCOG;

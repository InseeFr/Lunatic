const FILE_NAME = 'bailleurs-sociaux-2021.json';

async function fetchBailleurs(path = '') {
	const sbPath =
		process.env.NODE_ENV === 'development'
			? `${path}/${FILE_NAME}`
			: `/Lunatic/storybook/${FILE_NAME}`;
	const response = await fetch(sbPath);
	return response.json();
}

export default fetchBailleurs;

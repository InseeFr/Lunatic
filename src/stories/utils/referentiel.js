export const getReferentiel = async (name) => {
	switch (name) {
		case 'naf-rev2-stop':
		case 'naf-rev2':
			return fetch(
				'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json'
			).then((r) => r.json());
		case 'cog-communes':
			return fetch(
				'https://inseefr.github.io/Lunatic/storybook/communes-2019.json'
			).then((r) => r.json());
		default:
			throw new Error(`Unkonw référentiel ${name}`);
	}
};

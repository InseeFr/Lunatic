export const getReferentiel = async (name) => {
	switch (name) {
		case 'libelle-pcs2020':
			return fetch('./libelles-pcs-2020.json').then((r) => r.json());
		case 'naf-rev2-stop':
		case 'naf-rev2':
			return fetch('./naf-rev2.json').then((r) => r.json());
		case 'cog-communes':
			return fetch('./communes-2019.json').then((r) => r.json());
		default:
			throw new Error(`Unknown référentiel ${name}`);
	}
};

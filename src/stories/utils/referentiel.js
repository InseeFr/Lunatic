export const getReferentiel = async (name) => {
	 try {
		return fetch(`./${name}.json`).then((r) => r.json());
	 } catch (error) {
		throw new Error(`Unknown référentiel ${name}`);
	 }
	}

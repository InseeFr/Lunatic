import type { IndexEntry } from '../../utils/search/SearchInterface';

export const getReferentiel = async (name: string) => {
	try {
		return fetch(`./${name}.json`).then((r) => r.json()) as Promise<
			IndexEntry[]
		>;
	} catch {
		throw new Error(`Unknown référentiel ${name}`);
	}
};

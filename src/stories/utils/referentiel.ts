import type { IndexEntry } from '../../utils/search/SearchInterface';

export const getReferentiel = async (name: string) => {
	return fetch(`./${name}.json`)
		.then((r) => r.json())
		.catch(() => {
			throw new Error(`Unknown référentiel ${name}`);
		}) as Promise<IndexEntry[]>;
};

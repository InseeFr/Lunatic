import { times } from '../../utils/array';

/**
 * Create square of combination
 * @param size
 * @returns all coodornate of matrix in list exemple for 2x2 matrix, return [[0,0],[0,1],[1,0],[1,1]]
 */
export const getCombinations = (
	size: number
): (readonly [number, number])[] => {
	return times(size, (y) => times(size, (x) => [x, y] as const)).flat(1);
};

/**
 * Filter combination of pairwise for display only necessary ones
 * depending on whether we want to only display symlinks,
 * or if we display only selected iterations (because we display pairwise in a loop).
 * @param param: combination, current iteration (if in loop), isSymLink: indicate if we want to display symLink (for pairwise miror -> "lien symétriques")
 * @returns
 */
export const filterCombinations = ({
	combination,
	iteration,
	isSymLink = false,
}: {
	combination: readonly [number, number];
	iteration?: number;
	isSymLink?: boolean;
}): boolean => {
	const [x, y] = combination;
	const base = isSymLink ? y > x : y < x;
	if (iteration === undefined) return base;
	return y === iteration && base;
};

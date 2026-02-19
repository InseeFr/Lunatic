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
 * @param param: combination, current iteration (if in loop), readonly: indicate if combination should be readonly (for pairwise miror -> "lien symétriques")
 * @returns
 */
export const filterCombinations = ({
	combination,
	iteration,
	readonly = false,
}: {
	combination: readonly [number, number];
	iteration: number | undefined;
	readonly?: boolean;
}): boolean => {
	const [x, y] = combination;
	const base = readonly ? y > x : y < x;
	if (iteration === undefined) return base;
	return y === iteration && base;
};

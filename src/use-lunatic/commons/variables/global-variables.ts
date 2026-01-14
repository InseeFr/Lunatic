import { IterationLevel } from './models';

/** Special variable that will take the current iteration value. */
export const GLOBAL_ITERATION_INDEX = 'GLOBAL_ITERATION_INDEX';

/** Manually compute the global iteration index from current iteration level. */
export function computeGlobalIterationIndexValue(iteration: IterationLevel) {
	return [GLOBAL_ITERATION_INDEX, iteration[0] + 1];
}

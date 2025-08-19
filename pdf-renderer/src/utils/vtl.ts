import type { LunaticVariablesStore } from '../../../src/use-lunatic/commons/variables/lunatic-variables-store.ts';
import type { VTLExpression } from '../../../src/type.source.ts';
import type { ReactNode } from 'react';

export type Interpreter = ReturnType<typeof makeInterpret>;

/**
 * Generate an interpret function that will execute VTL expression
 */
export function makeInterpret(store: LunaticVariablesStore) {
	return (expr: VTLExpression | string | undefined, iteration?: number[]) => {
		if (!expr) {
			return null;
		}
		if (typeof expr === 'string') {
			return store.run(expr, { iteration }) as ReactNode;
		}
		return store.run(expr.value, { iteration }) as ReactNode;
	};
}

/**
 * Decorate the interpet function to automatically pass the iteration
 */
export function decorateInterpretIteration(
	interpreter: Interpreter,
	iteration: number[]
) {
	return (...args: Parameters<Interpreter>) => {
		return interpreter(args[0], args[1] ?? iteration);
	};
}

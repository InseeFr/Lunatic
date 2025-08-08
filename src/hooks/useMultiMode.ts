import type { LunaticVariablesStore } from '../use-lunatic/commons/variables/lunatic-variables-store';
import type { LunaticSource } from '../type.source';
import { useCallback } from 'react';
import { findComponentById } from '../utils/getArticulation';
import { forceInt } from '../utils/number';

/**
 * Retrieve the multimode state
 *
 * ## Why this hook
 *
 * The goal of this hook is to provide insights about a roundabout using extra information inserted in the JSON source
 * provided to Lunatic.
 *
 * For instance
 *
 * ```
 * {
 *    "multimode": {
 *         "questionnaire": {
 *             "rules": {
 *                 "IS_MOVED": {
 *                     "type": "VTL",
 *                     "value": "nvl(HABITEZ_VOUS_ICI, true)"
 *                 },
 *             }
 *         },
 *         "leaf": {
 *             "source": "id-roundabout-in-questionnaire",
 *             "rules": {
 *                 "IS_MOVED": {
 *                     "type": "VTL",
 *                     "value": "nvl(PRENOM_HABITE_PLUS_LA, false)"
 *                 },
 *             }
 *         }
 *     },
 * }
 * ```
 *
 * Run the expression to check if rules are true or false. A rule is considered as true if at least one expression is evaluated to true
 *
 * ```
 * {
 * 		"IS_MOVED": true
 * }
 * ```
 */
export function useMultiMode(
	source: LunaticSource,
	store: LunaticVariablesStore
) {
	const getMultiMode = useCallback(() => {
		if (!source.multimode) {
			return {};
		}

		const roundabout = findComponentById(
			source.components,
			source.multimode.leaf.source
		);

		const keys = new Set([
			...Object.keys(source.multimode.questionnaire.rules),
			...Object.keys(source.multimode.leaf.rules),
		]);
		const iterations = forceInt(store.run(roundabout?.iterations.value ?? '0'));

		return Object.fromEntries(
			Array.from(keys).map((key) => {
				// Check the value at questionnaire level
				const questionnaireExpression =
					source.multimode?.questionnaire.rules[key];
				if (
					questionnaireExpression &&
					store.run(questionnaireExpression.value)
				) {
					return [key, true];
				}

				const leafExpression = source.multimode?.leaf.rules[key];

				// There is no expression for the leaf
				if (!leafExpression) {
					return [key, false];
				}

				for (let i = 0; i < iterations; i++) {
					if (store.run(leafExpression.value, { iteration: [i] })) {
						return [key, true];
					}
				}

				return [key, false];
			})
		);
	}, [source, store]);

	return {
		getMultiMode,
	};
}

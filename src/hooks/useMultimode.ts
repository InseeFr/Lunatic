import type { LunaticVariablesStore } from '../use-lunatic/commons/variables/lunatic-variables-store';
import type { LunaticSource } from '../type.source';
import { useCallback } from 'react';
import { findComponentById } from '../utils/getArticulationState';
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
export function useMultimode(
	source: LunaticSource,
	store: LunaticVariablesStore
) {
	const getMultimode = useCallback(() => {
		if (!source.multimode) {
			return {};
		}

		// Initialize rules to empty objects if they do not exist
		const questionnaireRules = source.multimode.questionnaire?.rules || {};
		const leafRules = source.multimode.leaf?.rules || {};

		// If neither has rules, return an empty object
		if (Object.keys(questionnaireRules).length === 0 && Object.keys(leafRules).length === 0) {
			return {};
		}

		// Get unique rule keys
		const keys = new Set([
			...Object.keys(questionnaireRules),
			...Object.keys(leafRules),
		]);

		// Handle the case where leaf.source exists to retrieve iterations
		let iterations = 0;
		if (source.multimode.leaf?.source) {
			const roundabout = findComponentById(
				source.components,
				source.multimode.leaf.source
			);
			iterations = forceInt(
				store.run(roundabout?.iterations?.value ?? '') ?? 0
			);
		}

		return Object.fromEntries(
			Array.from(keys).map((key) => {
				// Check the rule at the questionnaire level
				const questionnaireExpression = questionnaireRules[key];
				if (
					questionnaireExpression &&
					store.run(questionnaireExpression.value)
				) {
					return [key, true];
				}

				// Check the rule at the leaf level
				const leafExpression = leafRules[key];
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
		getMultimode,
	};
}

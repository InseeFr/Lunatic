import type { ReactNode } from 'react';
import { isObject } from '../../../utils/is-object';
import type {
	LunaticComponentDefinition,
	LunaticExpression,
	LunaticReducerState,
} from '../../type';

const VTL_ATTRIBUTES = [
	['label', null],
	['options.label', null],
	['declarations.label', null],
	['description', null],
	['iterations', castNumber],
	['responses.label', null],
	['responses.description', null],
	['responses.detail.label', null],
	['options.description', null],
	['options.detail.label', null],
	['controls.iterations', castNumber],
	['items.label', null],
	['items.body', null],
	['lines.min', castNumber],
	['lines.max', castNumber],
	['xAxisIterations', castNumber],
	['yAxisIterations', castNumber],
	['conditionFilter', castBool],
	['header.label', null],
	['disabled', castBool],
	['readOnly', castBool],
	// For suggesters
	['arbitrary.label', castString],
	['arbitrary.inputLabel', castString],
] as const;

function castNumber(v: unknown): number {
	if (typeof v === 'number') {
		return v;
	}
	if (typeof v === 'string') {
		return parseInt(v, 10);
	}
	if (Array.isArray(v) && v.length > 0) {
		return castNumber(v[0]);
	}
	throw new Error(`Cannot cast "${v}" to number`);
}

function castBool(v: unknown): boolean {
	if (typeof v === 'boolean') {
		return v;
	}
	if (Array.isArray(v) && v.length > 0) {
		return castBool(v[0]);
	}
	if (Array.isArray(v)) {
		return false;
	}
	return Boolean(v);
}

function castString(v: unknown): string {
	if (typeof v === 'string') {
		return v;
	}
	if (typeof v === 'number') {
		return v.toString();
	}
	if (Array.isArray(v)) {
		return v.map(castString).join(', ');
	}
	if (!v) {
		return '';
	}
	return v.toString();
}

// Utility type to replace all expression from an object into a translated version
type UntranslatedProperties =
	| 'expressions'
	| 'sections'
	| 'body'
	| 'item'
	| 'controls'
	| 'components';
export type DeepTranslateExpression<T> = T extends LunaticExpression
	? ReactNode
	: T extends (infer ElementType)[]
		? DeepTranslateExpression<ElementType>[]
		: T extends { [k: string | number]: unknown }
			? {
					[key in keyof T]: key extends UntranslatedProperties
						? T[key]
						: DeepTranslateExpression<T[key]>;
				}
			: T;

/**
 * Interpret every VTL expression inside a component
 *
 * ## Example
 *
 * For instance a component like this :
 *
 * ```json
 * {
 * 	 "label": {"value": "\"Hello world\"", "type": "VTL"}
 * }
 * ```
 *
 * Would see its expression interpreted like this
 *
 * ```json
 * {
 *     "label": "Hello world"
 * }
 * ```
 */
export function fillComponentExpressions(
	component: LunaticComponentDefinition,
	state: {
		executeExpression: LunaticReducerState['executeExpression'];
		pager: Pick<LunaticReducerState['pager'], 'iteration' | 'linksIterations'>;
	}
): DeepTranslateExpression<LunaticComponentDefinition> {
	let filledComponent: any = component; // This is too dynamic to be typed correctly, allow any here

	for (const attribute of VTL_ATTRIBUTES) {
		const propertyPath = attribute[0].split('.');
		const caster = attribute[1];
		// Function that will convert expression into the desired type
		const convert = (expression: unknown) => {
			if (!isValidExpression(expression)) {
				throw new Error(
					`Expression expected at "${attribute[0]}", got ${expression}`
				);
			}
			const result = state.executeExpression(expression, {
				iteration: state.pager.linksIterations ?? state.pager.iteration,
			});
			try {
				return caster ? caster(result) : result;
			} catch (e) {
				throw new Error(`Cannot fill property ${propertyPath.join('.')}, ${e}`);
			}
		};
		filledComponent = interpretPropertyAtPath(
			filledComponent,
			propertyPath,
			convert
		);
	}

	return filledComponent;
}

function isValidExpression(
	expression: unknown
): expression is LunaticExpression {
	return Boolean(
		expression &&
			typeof expression === 'object' &&
			'type' in expression &&
			'value' in expression
	);
}

/**
 * Interpret a property at the specified path
 * - if the value is an array, keep explorer for each item
 * - if the property does not exist, the object is not modified
 */
function interpretPropertyAtPath(
	obj: unknown,
	path: string[],
	interpreter: (s: unknown) => unknown
): unknown {
	// For arrays, we need to keep exploring for each item
	if (Array.isArray(obj)) {
		return obj.map((item) => interpretPropertyAtPath(item, path, interpreter));
	}

	// We reached the property we want to translate
	if (path.length === 0) {
		return interpreter(obj);
	}
	const [property, ...rest] = path;
	if (!isObject(obj) || !(property in obj)) {
		return obj;
	}
	return {
		...obj,
		[property]: interpretPropertyAtPath(obj[property], rest, interpreter),
	};
}

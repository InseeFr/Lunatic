import type { ReactNode } from 'react';
import { isObject } from '../../../utils/is-object';
import type {
	LunaticComponentDefinition,
	LunaticExpression,
	LunaticReducerState,
} from '../../type';
import { firstValueItem } from '../../../utils/array';

const VTL_ATTRIBUTES = [
	'label',
	'options.label',
	'declarations.label',
	'description',
	'iterations',
	'responses.label',
	'responses.description',
	'options.description',
	'controls.iterations',
	'lines.min',
	'lines.max',
	'xAxisIterations',
	'yAxisIterations',
	'conditionFilter',
	'header.label',
	'disabled',
	'readOnly',
	// For suggesters
	'arbitrary.label',
	'arbitrary.inputLabel',
];

type CrawlArgs = Pick<LunaticReducerState, 'executeExpression'> &
	Pick<LunaticReducerState['pager'], 'iteration' | 'linksIterations'>;

// Utility type to replace all expression from an object into a translated version
export type DeepTranslateExpression<T> = T extends LunaticExpression
	? ReactNode
	: T extends { [k: string | number]: unknown }
		? {
				[key in keyof T]: DeepTranslateExpression<T[key]>;
			}
		: T;

function createCrawl({
	executeExpression,
	iteration,
	linksIterations,
}: CrawlArgs) {
	/**
	 * Translate the expression for the property
	 */
	function executeAndFillObject(object: Record<string, unknown>, path: string) {
		const candidate = object[path];
		try {
			const result = executeExpression(candidate, {
				iteration: linksIterations ?? iteration,
			});
			return {
				...object,
				// Todo : replace this with a casting system on execute
				[path]: Array.isArray(result) ? firstValueItem(result) : result,
			};
		} catch (e) {
			return {
				...object,
				[path]: e instanceof Error ? e.toString() : e,
			};
		}
	}

	function buildCrawlEntry(entry: unknown, path: string[]) {
		return Array.isArray(entry)
			? entry.map((e) => crawl(path, e))
			: crawl(path, entry);
	}

	/**
	 * Translate expression in an array
	 */
	function crawlArray(items: unknown[], path: string[]) {
		return items.reduce(function (stack: unknown[], entry) {
			const flattedEntry = buildCrawlEntry(entry, path);
			return [...stack, flattedEntry];
		}, [] as unknown[]);
	}

	/**
	 * Translate the expression found in the path
	 */
	function crawl(path: string[], object: unknown): Record<string, unknown> {
		const [step, ...rest] = path;

		if (!isObject(object)) {
			throw new Error('Cannot crawl something that is not an object');
		}

		if (step in object && rest.length === 0) {
			return executeAndFillObject(object, step);
		} else if (step in object) {
			const value = object[step];
			if (Array.isArray(value)) {
				return { ...object, [step]: crawlArray(value, rest) };
			}
			return { ...object, [step]: crawl(rest, value) };
		}

		return object;
	}

	return crawl;
}

function fillAttributes(
	component: LunaticComponentDefinition,
	{
		executeExpression,
		iteration,
		linksIterations,
	}: Pick<LunaticReducerState, 'executeExpression'> &
		Pick<LunaticReducerState['pager'], 'iteration' | 'linksIterations'>
): DeepTranslateExpression<LunaticComponentDefinition> {
	const crawl = createCrawl({ executeExpression, iteration, linksIterations });
	return VTL_ATTRIBUTES.reduce((acc, fullStringPath: string) => {
		const path = fullStringPath.split('.');
		return {
			...acc,
			...crawl(path, acc),
		};
	}, component) as any; // This is too dynamic to be typed correctly, in the future we would like to type each call to executeExpression
}

/**
 * Fill props interpreting VTL expression
 */
export function fillComponentExpressions(
	component: LunaticComponentDefinition,
	state: {
		executeExpression: LunaticReducerState['executeExpression'];
		pager: Pick<LunaticReducerState['pager'], 'iteration' | 'linksIterations'>;
	}
) {
	const { pager, executeExpression } = state;
	const { iteration, linksIterations } = pager;
	return fillAttributes(component, {
		executeExpression,
		iteration,
		linksIterations,
	});
}

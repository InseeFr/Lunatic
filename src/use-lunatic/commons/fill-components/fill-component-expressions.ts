import { ReactNode } from 'react';
import { isObject } from '../../../utils/is-object';
import {
	LunaticComponentDefinition,
	LunaticExpression,
	LunaticState,
} from '../../type';

const VTL_ATTRIBUTES = [
	'label',
	'options.label',
	'responses.label',
	'hierarchy.label',
	'hierarchy.sequence.label',
	'hierarchy.subSequence.label',
	'declarations.label',
	'description',
	'responses.description',
	'options.description',
	// Disable controls compilation
	// 'controls.control',
	// 'controls.errorMessage',
	'controls.iterations',
	'lines.min',
	'lines.max',
	'iterations',
	'xAxisIterations',
	'yAxisIterations',
	'conditionFilter',
	'headers.label',
	'header.label',
	'questionContext',
	'questionInformation',
	'dynamicUnit',
];

type CrawlArgs = Pick<LunaticState, 'executeExpression'> &
	Pick<LunaticState['pager'], 'iteration' | 'linksIterations'>;

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
			return {
				...object,
				[path]: executeExpression(candidate, {
					iteration,
					linksIterations,
				}),
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
			const value = (object as Record<string, unknown>)[step];
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
	}: Pick<LunaticState, 'executeExpression'> &
		Pick<LunaticState['pager'], 'iteration' | 'linksIterations'>
) {
	const crawl = createCrawl({ executeExpression, iteration, linksIterations });
	return VTL_ATTRIBUTES.reduce(
		function (step, fullStringPath: string) {
			const path = fullStringPath.split('.');
			return {
				...step,
				...crawl(path, step),
			};
		},
		{ ...component } as typeof component
	);
}

function fillComponentExpressions(
	component: LunaticComponentDefinition,
	state: {
		executeExpression: LunaticState['executeExpression'];
		pager: Pick<LunaticState['pager'], 'iteration' | 'linksIterations'>;
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

export default fillComponentExpressions;

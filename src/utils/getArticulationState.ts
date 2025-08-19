import type {
	ComponentDefinition,
	ComponentRoundaboutDefinition,
	LunaticSource,
} from '../type.source';
import type { LunaticData, PageTag } from '../use-lunatic/type';
import { reducerInitializer } from '../use-lunatic/reducer/reducerInitializer';
import { type ReactNode } from 'react';
import { times } from './array';
import { forceInt } from './number';

export enum ArticulationState {
	COMPLETED = 1,
	STARTED = 0,
	NOT_STARTED = -1,
}

type ArticulationItem = {
	label: string;
	value: string;
};

type Articulation = {
	source: string;
	items: ArticulationItem[];
};

type Item = {
	cells: {
		label: string;
		value: ReactNode;
	}[];
	progress: ArticulationState; // -1: not completed, 0: started, 1: finished
	page: PageTag;
};

/**
 * Retrieve the articulation state
 *
 * The goal of this function is to provide insights about a roundabout using extra information inserted in the JSON source
 * provided to Lunatic.
 *
 * For instance
 *
 * ```
 *  "articulation": {
 *    "source": "roundabout",
 *    "items": [
 *      {
 *        "label": "Prénom",
 *        "value": "PRENOMS"
 *      },
 *      {
 *        "label": "Sexe",
 *        "value": "if SEXE = \"H\" then \"Homme\" else \"Femme\""
 *      },
 *      {
 *        "label": "Age",
 *        "value": "cast(AGE, string) || \" ans\""
 *      }
 *    ]
 *  },
 * ```
 *
 * - source is the ID of the roundabout component
 * - items define the field to extract from the roundabout data
 */
export function getArticulationState(
	source: LunaticSource & { articulation: Articulation },
	data: LunaticData
): { items: Item[] } {
	const roundabout = findComponentById(
		source.components,
		source.articulation.source
	);
	const { variables } = reducerInitializer({ source, data });
	const iterations = forceInt(
		variables.run(roundabout?.iterations.value ?? '0')
	);

	const rows = times(iterations, (k) =>
		source.articulation.items.map((item) => ({
			label: item.label,
			value: variables.run(item.value, { iteration: [k] }) as ReactNode,
		}))
	);

	if (!roundabout) {
		return {
			items: [],
		};
	}

	return {
		items: rows.map((row, k) => ({
			cells: row,
			progress: forceInt(
				variables.get(roundabout.progressVariable, [k]) ??
					ArticulationState.NOT_STARTED
			),
			page: (roundabout.page
				? `${roundabout.page}.1#${k + 1}`
				: '1') as PageTag,
		})),
	};
}

export function findComponentById(
	components: ComponentDefinition[],
	id: string
): (ComponentRoundaboutDefinition & { page?: string }) | null {
	for (const c of components) {
		if ('id' in c && c.id === id && c.componentType === 'Roundabout') {
			return c;
		}
		if ('components' in c) {
			const child = findComponentById(c.components, id);
			if (child) {
				return child;
			}
		}
	}
	return null;
}

import type {
	ComponentDefinition,
	ComponentRoundaboutDefinition,
	LunaticSource,
} from '../type.source';
import type { LunaticData } from '../use-lunatic/type';
import { reducerInitializer } from '../use-lunatic/reducer/reducerInitializer';
import { type ReactNode, useMemo } from 'react';
import { times } from '../utils/array';
import { forceInt } from '../utils/number';

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
		page?: string;
	}[];
	progress: number; // -1: not completed, 0: started, 1: finished
};

/**
 * Hook to get articulation state
 *
 * ## Why this hook
 *
 * The goal of this hook is to provide insights about a roundabout using extra information inserted in the JSON source
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
export function useArticulation(
	source: LunaticSource & { articulation: Articulation },
	data: LunaticData
): { items: Item[] } {
	const roundabout = useMemo(
		() => findComponentById(source.components, source.articulation.source),
		[source]
	);
	const { variables } = useMemo(
		() => reducerInitializer({ source, data }),
		[source, data]
	);

	const iterations = useMemo(
		() => forceInt(variables.run(roundabout?.iterations.value ?? '0')),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[source, data]
	);

	const rows = useMemo(() => {
		return times(iterations, (k) =>
			source.articulation.items.map((item) => ({
				label: item.label,
				value: variables.run(item.value, { iteration: [k] }) as ReactNode,
			}))
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [source, data, iterations, roundabout?.progressVariable]);

	if (!roundabout) {
		return {
			items: [],
		};
	}

	return {
		items: rows.map((row, k) => ({
			cells: row,
			progress: forceInt(variables.get(roundabout.progressVariable, [k]) ?? -1),
			page: roundabout.page ? `${roundabout.page}.1#${k + 1}` : '1',
		})),
	};
}

function findComponentById(
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

import { resizeArrayVariable } from '../commons';
import type { LunaticState } from '../../type';
import { type ActionHandleChange } from '../../actions';

type Payload = ActionHandleChange['payload']['args'] & {
	name: string;
	value: string;
};

function reduceOne(
	variables: LunaticState['variables'],
	{ name, value, linksIterations, lengths }: Payload
) {
	if (name in variables && linksIterations && lengths) {
		const variable = variables[name];
		const { value: v } = variable;
		const [x, y] = linksIterations;
		const [lx, ly] = lengths;
		if (Array.isArray(v)) {
			const next = resizeArrayVariable([...v], lx, [] as unknown[]);
			next[x] = resizeArrayVariable([...next[x]], ly, null);
			next[x][y] = value;
			return {
				...variables,
				[name]: { ...variable, value: next },
			};
		}
	}
	return variables;
}

/**
 * Update the link variable in pair wise situation
 *
 * If person1 is "parent" of person2 we have to update person2 as a "child" of person1
 */
function reduceLinksVariable(
	variables: LunaticState['variables'],
	{ name, value, linksIterations, symLinks, lengths }: Payload
) {
	if (symLinks && name in symLinks && linksIterations) {
		const symValue = symLinks[name][value];
		const [x, y] = linksIterations;
		const symIteration = [y, x];

		if (symValue) {
			return reduceOne(
				reduceOne(variables, { name, value, linksIterations, lengths }),
				{
					name,
					value: symValue,
					linksIterations: symIteration,
					lengths,
				}
			);
		}
	}
	return reduceOne(variables, { name, value, linksIterations, lengths });
}

export default reduceLinksVariable;

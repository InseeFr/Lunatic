import type { LunaticComponentProps } from '../types.ts';
import { decorateInterpretIteration } from '../utils/vtl.ts';
import { LunaticComponent, LunaticComponents } from './LunaticComponent.tsx';
import { forceInt } from '../../../src/utils/number.ts';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles.ts';
import { hasResponse } from '../../../src/use-lunatic/commons/component.ts';

type Props = LunaticComponentProps<'Loop'>;

export function Loop({
	label,
	interpret,
	components,
	iterations: iterationsExpr,
}: Props) {
	if (components.length === 0) {
		return null;
	}

	const getIterations = () => {
		// We have an iteration expression we can use to resolve the number of iteration
		if (iterationsExpr) {
			return forceInt(
				interpret(iterationsExpr),
				`Cannot interpret ${iterationsExpr} to get loop size ${label}`
			);
		}

		// Otherwise, look for the first variable inside the children
		for (const component of components) {
			if (hasResponse(component)) {
				// @ts-expect-error component.response is a known value
				const value = interpret(component.response);
				if (Array.isArray(value)) {
					return value.length;
				}
			}
		}
		return 0;
	};

	return (
		<>
			{Array.from({ length: getIterations() }).map((_, k) => {
				const interpretAtIteration = decorateInterpretIteration(interpret, [k]);
				return (
					<View key={k}>
						<Text style={styles.h3}>Iteration #{k + 1}</Text>
						<LunaticComponents
							components={components}
							interpret={interpretAtIteration}
						/>
					</View>
				);
			})}
		</>
	);
}

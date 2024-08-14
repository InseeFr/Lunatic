import { CustomRoundabout } from './CustomRoundabout';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';

/**
 * Roundabout is a special loop component where the user can select the iteration to go to
 */
export function Roundabout(props: LunaticComponentProps<'Roundabout'>) {
	const goToIteration = (iteration: number) => {
		if (
			props.items[iteration].progress !== 1 &&
			props.items[iteration].progress !== 0
		) {
			props.handleChanges([
				{ name: props.progressVariable, value: 0, iteration: [iteration] },
			]);
		}
		props.goToPage({
			page: props.page,
			subPage: 0,
			iteration,
			nbIterations: props.iterations,
		});
	};

	const itemsWithErrors = props.items.map((item, k) => ({
		...item,
		errors: getComponentErrors(props.errors, `${props.id}-${k}`),
	}));

	return (
		<CustomRoundabout
			{...props}
			errors={getComponentErrors(props.errors, props.id)}
			items={itemsWithErrors}
			goToIteration={goToIteration}
		/>
	);
}

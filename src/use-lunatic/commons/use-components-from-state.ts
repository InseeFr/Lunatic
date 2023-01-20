import { useEffect, useState } from 'react';
import getComponentsFromState from './get-components-from-state';
import fillComponents from './fill-components';
import { LunaticState } from '../type';
import { LunaticComponentProps } from './fill-components/fill-components';

function useComponentsFromState(state: LunaticState) {
	const [componentsFilled, setComponentsFilled] = useState(
		[] as LunaticComponentProps[]
	);

	useEffect(
		function () {
			const { pager, pages, isInLoop } = state;
			const components = getComponentsFromState({ pager, pages, isInLoop });
			const filled = fillComponents(components, state);
			const filtered = filled.filter(({ conditionFilter }) => {
				return conditionFilter !== undefined ? conditionFilter : true;
			});
			setComponentsFilled(filtered);
		},
		[state]
	);

	return componentsFilled;
}

export default useComponentsFromState;

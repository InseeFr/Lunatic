import { useMemo } from 'react';
import getComponentsFromState from './get-components-from-state';
import fillComponents from './fill-components';
import type { LunaticState } from '../type';
import type { LunaticComponentProps } from '../../components/type';

function useComponentsFromState(state: LunaticState) {
	return useMemo(
		function () {
			const { pager, pages, isInLoop } = state;
			const components = getComponentsFromState({ pager, pages, isInLoop });
			const filled = fillComponents(components, state);
			return filled.filter(({ conditionFilter }) => {
				return conditionFilter !== undefined ? conditionFilter : true;
			}) as LunaticComponentProps[];
		},
		[state]
	);
}

export default useComponentsFromState;

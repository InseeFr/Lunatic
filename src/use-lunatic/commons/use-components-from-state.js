import { useState, useEffect } from 'react';
import getComponentsFromState from './get-components-from-state';
import fillComponents from './fill-components';

function useComponentsFromState(state) {
	const [componentsFilled, setComponentsFilled] = useState([]);

	useEffect(
		function () {
			const { pager, pages, isInLoop } = state;
			const components = getComponentsFromState({ pager, pages, isInLoop });
			setComponentsFilled(fillComponents(components, state));
		},
		[state]
	);

	return componentsFilled;
}

export default useComponentsFromState;

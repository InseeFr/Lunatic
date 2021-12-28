import { useState, useEffect } from 'react';
import getComponentsFromState from './get-components-from-state';
import fillComponents from './fill-components';

function useComponentsFromState(state) {
	const { pager, pages, isInLoop } = state;
	const [components, setComponents] = useState([]);
	const [componentsFilled, setComponentsFilled] = useState([]);

	useEffect(
		function () {
			setComponents(getComponentsFromState({ pager, pages, isInLoop }));
		},
		[pager, pages, isInLoop]
	);

	useEffect(
		function () {
			setComponentsFilled(fillComponents(components, state));
		},
		[components, state]
	);

	return componentsFilled;
}

export default useComponentsFromState;

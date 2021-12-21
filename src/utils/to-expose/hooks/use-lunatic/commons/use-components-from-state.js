import { useState, useEffect } from 'react';
import getComponentsFromState from './get-components-from-state';
import fillComponents from './fill-components';

function useComponentsFromState(state) {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;
	const [components, setComponents] = useState([]);
	const [componentsFilled, setComponentsFilled] = useState([]);

	useEffect(
		function () {
			setComponents(getComponentsFromState(state));
		},
		[page, pages, subPage, isInLoop]
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

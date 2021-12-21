import { useState, useEffect } from 'react';
import fillComponents from './fill-components';

function useComponentsFromState(state) {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;
	const [components, setComponents] = useState([]);
	const [componentsFilled, setComponentsFilled] = useState([]);

	useEffect(
		function () {
			if (page && pages && page in pages) {
				const current = pages[page];
				if (isInLoop) {
					const { subPages } = current;
					const stepName = subPages[subPage];
					if (stepName in pages) {
						const currentSubPage = pages[stepName];
						const { components } = currentSubPage;
						setComponents(components);
					}
				} else {
					const { components } = current;
					setComponents(components);
				}
			}
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

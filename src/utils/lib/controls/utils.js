import { buildLoopBindings } from '../loops';
import { interpret } from '../../to-expose/interpret';
import { splitPage } from '..';

export const getControls = ({ page, components, bindings, features }) =>
	getControlsFromComponents({
		page,
		components,
		depth: 1,
		bindings,
		features,
	});

const getControlsFromComponents = ({
	page,
	depth,
	components,
	bindings,
	features,
}) => {
	const { currentIteration, currentPageWithoutAnyIteration } = splitPage(
		page,
		depth
	);
	return components.reduce((acc, component) => {
		const {
			controls,
			componentType,
			components: loopComponents,
			page: componentPage,
		} = component;
		if (componentType === 'Loop') {
			const { bindingDependencies: bindingDependenciesLoop } = component;
			const rootLoopBindings = getReducedBindings(
				bindingDependenciesLoop,
				bindings
			);
			const loopBindings = buildLoopBindings(currentIteration - 1)(
				Object.entries(rootLoopBindings)
			);
			return [
				...acc,
				...getControlsFromComponents({
					page,
					components: loopComponents,
					bindings: loopBindings,
					features,
					depth: depth + 1,
				}),
			];
		}
		if (controls && currentPageWithoutAnyIteration === componentPage) {
			const interpretedControls = controls.reduce(
				(
					iC,
					{ id, control, errorMessage, criticality, bindingDependencies }
				) => {
					const reducedBindings = getReducedBindings(
						bindingDependencies,
						bindings
					);
					const interpretedControl =
						interpret(features)(reducedBindings)(control);
					if (!interpretedControl)
						return [...iC, { id, errorMessage, criticality }];
					return iC;
				},
				[]
			);
			return [...acc, ...interpretedControls];
		}
		return acc;
	}, []);
};

const getReducedBindings = (bindingDependencies, bindings) =>
	(bindingDependencies || []).reduce(
		(accB, bD) => ({ ...accB, [bD]: bindings[bD] }),
		{}
	);

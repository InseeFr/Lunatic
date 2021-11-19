import { buildLoopBindings } from '../loops';
import { interpret } from '../../to-expose/interpret';
import { splitPage } from '..';
import { getTypeControls } from '../../../components/component-wrapper/controls/validators';

export const getControls = ({
	page,
	components,
	bindings,
	features,
	preferences,
}) =>
	getControlsFromComponents({
		page,
		components,
		depth: 1,
		bindings,
		features,
		preferences,
	});

const getControlsFromComponents = ({
	page,
	depth,
	components,
	bindings,
	features,
	preferences,
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
			paginatedLoop,
		} = component;
		if (componentType === 'Loop') {
			const { bindingDependencies: bindingDependenciesLoop } = component;
			const rootLoopBindings = getReducedBindings(
				bindingDependenciesLoop,
				bindings
			);
			let loopBindings = {};
			if (paginatedLoop) {
				loopBindings = buildLoopBindings(currentIteration - 1)(
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
						preferences,
					}),
				];
			} else {
				const { loopDependencies } = component;
				const iterations = parseInt(bindings[loopDependencies[0]], 10);
				const ctrls = [...Array(iterations).keys()].reduce((accIt, i) => {
					loopBindings = buildLoopBindings(i)(Object.entries(rootLoopBindings));
					return [
						...accIt,
						...getControlsFromComponents({
							page,
							components: loopComponents,
							bindings: loopBindings,
							features,
							depth: depth,
							preferences,
						}),
					];
				}, []);
				return [...acc, ...ctrls];
			}
		}
		if (currentPageWithoutAnyIteration === componentPage) {
			if (controls) {
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
				if (!['InputNumber', 'Datepicker'].includes(componentType))
					return [...acc, ...interpretedControls];
				else {
					const {
						response: { name },
					} = component;
					const value = bindings[name];
					const typeControls = getTypeControls({
						...component,
						value,
						preferences,
					});

					if (!typeControls) return [...acc, ...interpretedControls];
					return [
						...acc,
						{ ...typeControls, criticality: 'LOCK' },
						...interpretedControls,
					];
				}
			}
			if (['InputNumber', 'Datepicker'].includes(componentType)) {
				const {
					response: { name },
				} = component;
				const value = bindings[name];
				const typeControls = getTypeControls({
					...component,
					value,
					preferences,
				});
				if (!typeControls) return [...acc];
				return [...acc, { ...typeControls, criticality: 'LOCK' }];
			}
		}
		return acc;
	}, []);
};

const getReducedBindings = (bindingDependencies, bindings) =>
	(bindingDependencies || []).reduce(
		(accB, bD) => ({ ...accB, [bD]: bindings[bD] }),
		{}
	);

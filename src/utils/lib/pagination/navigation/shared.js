import { interpret } from '../../../to-expose/interpret';
import { FLOW_NEXT, FLOW_PREVIOUS } from '../flow';
import {
	buildVectorialBindings,
	buildLoopBindings,
} from '../../loops/bindings';

export const getPage = ({
	components,
	bindings,
	currentPage,
	featuresWithoutMD,
	depth,
	flow,
	management,
}) => {
	const { currentRootPage, currentComponentIndex, currentIteration } =
		splitPage(currentPage, depth);

	const filteredComponents = (
		flow === FLOW_PREVIOUS ? components.slice().reverse() : components
	).filter(({ page }) => {
		if (flow === FLOW_NEXT && !currentRootPage)
			return parseInt(page, 10) > parseInt(currentPage, 10);
		if (flow === FLOW_NEXT && currentRootPage)
			return parseInt(page, 10) >= parseInt(currentPage, 10);
		if (flow === FLOW_PREVIOUS && !currentRootPage)
			return parseInt(page, 10) < parseInt(currentPage, 10);
		if (flow === FLOW_PREVIOUS && currentRootPage)
			return parseInt(page, 10) <= parseInt(currentPage, 10);
		throw new Error('Unknown type');
	});
	for (let index = 0; index < filteredComponents.length; index++) {
		const component = filteredComponents[index];
		const { id, componentType, page, paginatedLoop } = component;

		// TODO: Handle loop into loop
		// Easy way: build array with all combinations, but not efficient
		if (componentType === 'Loop' && paginatedLoop) {
			const {
				conditionFilter: { bindingDependencies: loopBD, value: loopV },
			} = component;
			const loopB = (loopBD || []).reduce(
				(acc, b) => ({ ...acc, [b]: bindings[b] }),
				{}
			);
			const loopVectorialB = buildVectorialBindings(loopB);
			if (
				management ||
				interpret(featuresWithoutMD)(loopVectorialB)(loopV) !== true ||
				(flow === FLOW_PREVIOUS &&
					currentIteration === 1 &&
					currentComponentIndex === 1)
			)
				continue;
			const iterations = getIterations({
				component,
				bindings,
				featuresWithoutMD,
			});
			const { components: loopComponents } = component;
			const startedIteration = getStartedIteration({
				currentIteration,
				currentRootPage,
				page,
				flow,
				iterations,
			});
			const iterationsArray = buildIterationsArray({
				start: flow === FLOW_NEXT ? startedIteration : 0,
				end: flow === FLOW_NEXT ? iterations - 1 : startedIteration,
				flow,
			});
			const componentIndexArray = buildIterationsArray({
				start: 0,
				end: loopComponents.length - 1,
				flow,
			});
			for (const it of iterationsArray.values()) {
				for (const componentIndex of componentIndexArray.values()) {
					const loopComponent = loopComponents[componentIndex];
					if (
						hasToBeExcluded({
							flow,
							currentRootPage,
							page,
							it,
							currentIteration,
							loopComponentIndex: componentIndex,
							currentComponentIndex,
							loopComponent,
						})
					)
						continue;
					const {
						conditionFilter: { bindingDependencies: bDLoop, value: vLoop },
					} = loopComponent;
					const loopVars = (bDLoop || []).map((b) => {
						if (bindings[b]) return [b, bindings[b]];
						return [b, null];
					});
					const loopBindings = buildLoopBindings(it)(loopVars);

					// Need vectorial loopBindings instead of loopBindings?
					const res = interpret(featuresWithoutMD)(loopBindings)(vLoop);
					if (management || res === true)
						return `${loopComponent.page}#${it + 1}`;
				}
			}
		} else {
			// Handle Simple Component + Loop on the same page
			const block = filteredComponents.filter(
				(c) => c.page === page && c.componentType === 'Loop'
			);

			if (block.length > 0) {
				const loopIdOfInterest =
					flow === FLOW_NEXT ? block[0].id : block[block.length - 1].id;
				const currentComponentIndexInFiltered = filteredComponents.findIndex(
					(c) => c.id === id
				);
				const loopOfInterestIndex = filteredComponents.findIndex(
					(c) => c.id === loopIdOfInterest
				);
				if (
					(flow === FLOW_NEXT &&
						!(loopOfInterestIndex <= currentComponentIndexInFiltered)) ||
					(flow === FLOW_PREVIOUS &&
						!(loopOfInterestIndex >= currentComponentIndexInFiltered))
				) {
					continue;
				}
			}
			const {
				conditionFilter: { bindingDependencies, value },
			} = component;
			const filterBindings = (bindingDependencies || []).reduce(
				(acc, b) => ({ ...acc, [b]: bindings[b] }),
				{}
			);
			const vectorialBindings = buildVectorialBindings(filterBindings);
			const res = interpret(featuresWithoutMD)(vectorialBindings)(value);
			if (management || res === true) return page;
		}
	}
};

const getStartedIteration = ({
	currentIteration,
	currentRootPage,
	page,
	flow,
	iterations,
}) => {
	if (currentIteration && currentRootPage === page) return currentIteration - 1;
	if (flow === FLOW_NEXT) return 0;
	if (flow === FLOW_PREVIOUS) return iterations - 1;
};

const buildIterationsArray = ({ end, start, flow }) => {
	const array = [...Array(end - start + 1)].map((_, i) => i + start);
	return flow === FLOW_PREVIOUS ? array.slice().reverse() : array;
};

const hasToBeExcluded = ({
	flow,
	currentRootPage,
	page,
	it,
	currentIteration,
	loopComponentIndex,
	currentComponentIndex,
	loopComponent,
}) => {
	if (flow === FLOW_NEXT)
		return (
			(currentRootPage === page &&
				it === currentIteration - 1 &&
				loopComponentIndex <= currentComponentIndex) ||
			!loopComponent.page
		);
	if (flow === FLOW_PREVIOUS)
		return (
			(currentRootPage === page &&
				it === currentIteration - 1 &&
				loopComponentIndex >= currentComponentIndex - 1) ||
			!loopComponent.page
		);
	return false;
};

const getIterations = ({ component, bindings, featuresWithoutMD }) => {
	const { loopDependencies, iterations: iterationsFormula, lines } = component;
	const iterationsBindings = loopDependencies.reduce(
		(acc, b) => ({ ...acc, [b]: bindings[b] }),
		{}
	);
	const iterationsVectorialBindings =
		buildVectorialBindings(iterationsBindings);
	if (iterationsFormula) {
		return parseInt(
			interpret(featuresWithoutMD)(iterationsVectorialBindings)(
				iterationsFormula
			),
			10
		);
	}
	if (lines) {
		const { min, max } = lines;
		const maxRes = parseInt(
			interpret(featuresWithoutMD)(iterationsVectorialBindings)(max),
			10
		);
		return maxRes || parseInt(min, 10);
	}
};

export const splitPage = (currentPage = '1', depth) => {
	const currentPageWithDepth = depth
		? currentPage
				.split('.')
				.slice(0, depth + 1) // scoped
				.join('.')
		: currentPage;

	const currentPageWithoutIteration = currentPageWithDepth
		.split('#')
		.slice(0, -1)
		.join('#');

	const currentPageWithoutAnyIteration = currentPageWithDepth
		.split('.')
		.map((e) => e.split('#')[0])
		.join('.');

	const currentRootPage = currentPageWithoutIteration
		.split('.')
		.slice(0, -1)
		.join('.');

	const [currentComponentIndex, currentIteration] = currentPageWithDepth
		.split('.')
		.pop()
		.split('#')
		.map((c) => parseInt(c, 10));

	return {
		currentRootPage,
		currentComponentIndex,
		currentIteration,
		currentPageWithoutAnyIteration,
	};
};

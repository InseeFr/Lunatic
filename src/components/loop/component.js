import React, { useState, useEffect } from 'react';
import * as lunatic from '../components';
import { interpret } from '../../utils/to-expose';
import * as U from '../../utils/lib';
import './loop.scss';

const Loop = ({
	id,
	label,
	iterations,
	components,
	bindings,
	handleChange,
	loopDependencies,
	maxPage,
	pagination,
	paginatedLoop,
	currentPage,
	setPage,
	flow,
	depth: loopDepth,
	...orchetratorProps
}) => {
	const [todos, setTodos] = useState([]);
	const vectorialBindings = U.buildVectorialBindings(bindings);
	const { features } = orchetratorProps;
	const featuresWithoutMD = features.filter((f) => f !== 'MD');
	const iterationNb =
		parseInt(interpret(featuresWithoutMD)(vectorialBindings)(iterations), 10) ||
		0;
	const involvedVariables = U.getInvolvedVariables(components);

	/**
	 * Handle the increase in the number of iterations
	 * Assume we only want to update if iterationNb changes
	 */
	useEffect(() => {
		const toUpdate = involvedVariables.reduce((acc, { name: iv, depth }) => {
			if (bindings[iv] && iterationNb > bindings[iv].length)
				return {
					...acc,
					[iv]: [
						...bindings[iv],
						...new Array(iterationNb - bindings[iv].length).fill(
							U.buildEmptyValue(depth)
						),
					],
				};
			return acc;
		}, {});
		if (Object.keys(toUpdate).length !== 0) handleChange(toUpdate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iterationNb]);

	useEffect(() => {
		if (todos.length !== 0) {
			const todosObj = todos.reduce((acc, { up, rowNumber }) => {
				const entries = Object.entries(up);
				if (entries.length === 0) return acc;
				const [k, value] = entries[0];
				const previousValue = bindings[k];
				const newValue = previousValue.map((v, i) =>
					i === rowNumber ? value : v
				);
				return { ...acc, [k]: newValue };
			}, {});
			handleChange(todosObj);
			setTodos([]);
		}
	}, [bindings, todos, handleChange]);

	/**
	 * Handle init page
	 */

	if (
		pagination &&
		paginatedLoop &&
		loopDepth > currentPage.split('.').length - 1
	) {
		if (flow === U.FLOW_NEXT) {
			setPage(`${currentPage}.1#1`);
		} else if (flow === U.FLOW_PREVIOUS) {
			setPage(`${currentPage}.${maxPage}#${iterationNb}`);
		}
		return null;
	}

	const flattenComponents = U.buildLoopComponents(iterationNb)(components);

	const {
		currentRootPage,
		currentComponentIndex,
		currentIteration,
		currentPageWithoutAnyIteration,
	} = U.splitPage(currentPage, loopDepth);

	if (
		pagination &&
		paginatedLoop &&
		loopDepth === currentPage.split('.').length - 1
	) {
		// Previous at first component
		if (currentComponentIndex < 1) {
			setPage(`${currentRootPage}.${maxPage}#${currentIteration - 1}`);
			return null;
		}

		// Next at last component
		if (currentComponentIndex > maxPage) {
			setPage(`${currentRootPage}.1#${currentIteration + 1}`);
			return null;
		}

		// Previous at first iteration
		if (currentIteration < 1) {
			const splitRoot = currentRootPage.split('.');
			if (splitRoot.length === 1) setPage(`${parseInt(splitRoot[0], 10) - 1}`);
			else {
				const subPagesToUpdate = splitRoot.slice().pop().split('#');
				const newSubPage = `${parseInt(subPagesToUpdate[0], 10) - 1}#${
					subPagesToUpdate[1]
				}`;
				const newPage = [
					...splitRoot.slice(0, splitRoot.length - 1),
					newSubPage,
				].join('.');
				setPage(`${newPage}`);
			}
			return null;
		}

		// Next at last iteration
		if (currentIteration > iterationNb) {
			const splitRoot = currentRootPage.split('#');
			const newRootPage =
				splitRoot.length === 1
					? parseInt(splitRoot[0], 10) + 1
					: splitRoot.slice(0, -1).join('#');
			if (splitRoot.length === 1) setPage(`${newRootPage}`);
			else {
				const {
					currentRootPage: newCurrentRootPage,
					currentIteration: newCurrentIteration,
				} = U.splitPage(currentRootPage, loopDepth);
				setPage(`${newCurrentRootPage}.1#${newCurrentIteration + 1}`);
			}
			return null;
		}
	}

	const localCache = {};

	const loopComponents = flattenComponents.reduce(
		(
			acc,
			{
				componentType,
				id: idC,
				rowNumber,
				conditionFilter,
				page,
				bindingDependencies = [],
				missingResponse,
				...rest
			}
		) => {
			const loopVars = bindingDependencies.map((b) => {
				if (bindings[b]) return [b, bindings[b]];
				return [b, null];
			});
			const loopBindings = U.buildLoopBindings(rowNumber)(loopVars);

			const loopMissingResponse =
				U.buildLoopMissingResponse(rowNumber)(missingResponse);

			if (!U.displayLoopQuestion(bindingDependencies)(loopBindings)) return acc;
			const Component = lunatic[componentType];

			const { bindingDependencies: filterDependencies = [], value = '' } =
				conditionFilter;

			const filterVars = filterDependencies.map((b) => {
				if (bindings[b]) return [b, bindings[b]];
				return [b, null];
			});
			const filterBindings = U.buildLoopBindings(rowNumber)(filterVars);
			const set = () => {
				const v = interpret(featuresWithoutMD)(filterBindings)(value);
				localCache[`${value}-row-${rowNumber}`] = v;
				return v;
			};

			const filterResult = localCache[value] || set();

			if (
				!filterResult ||
				(pagination &&
					(!currentPageWithoutAnyIteration.startsWith(page) ||
						(paginatedLoop && rowNumber + 1 !== currentIteration)))
			)
				return acc;
			return [
				...acc,
				<div key={`${idC}-loop-${rowNumber}`} className="loop-component">
					<Component
						{...orchetratorProps}
						{...rest}
						id={`${idC}-loop-${rowNumber}`}
						handleChange={(up) => {
							console.log('LOOP');
							setTodos((t) => [...t, { up, rowNumber }]);
						}}
						bindings={loopBindings}
						bindingDependencies={bindingDependencies}
						componentType={componentType}
						pagination={pagination}
						currentPage={currentPage}
						setPage={setPage}
						flow={flow}
						conditionFilter={conditionFilter}
						missingResponse={loopMissingResponse}
					/>
				</div>,
			];
		},
		[]
	);

	if (pagination && paginatedLoop && loopComponents.length === 0) {
		if (flow === U.FLOW_NEXT) {
			setPage(
				`${currentRootPage}.${currentComponentIndex + 1}#${currentIteration}`
			);
		} else if (flow === U.FLOW_PREVIOUS) {
			setPage(
				`${currentRootPage}.${currentComponentIndex - 1}#${currentIteration}`
			);
		}
		return null;
	}

	return (
		<div id={`loop-${id}`} className="lunatic-loop">
			{loopComponents}
		</div>
	);
};

export default React.memo(Loop, U.areEqual);

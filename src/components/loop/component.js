import React, { useState, useEffect } from 'react';
import * as lunatic from '../components';
import { interpret } from '../../utils/to-expose';
import * as U from '../../utils/lib';
import './loop.scss';

// const Loop = ({
// 	id,
// 	label,
// 	iterations,
// 	components,
// 	bindings,
// 	handleChange,
// 	loopDependencies,
// 	maxPage,
// 	pagination,
// 	paginatedLoop,
// 	currentPage,
// 	depth: loopDepth,
// 	...orchetratorProps
// }) => {
// 	const [todos, setTodos] = useState([]);
// 	const vectorialBindings = U.buildVectorialBindings(bindings);
// 	const { features } = orchetratorProps;
// 	const featuresWithoutMD = features.filter((f) => f !== 'MD');
// 	const iterationNb =
// 		parseInt(interpret(featuresWithoutMD)(vectorialBindings)(iterations), 10) ||
// 		0;
// 	const involvedVariables = U.getInvolvedVariables(components);

// 	/**
// 	 * Handle the increase in the number of iterations
// 	 * Assume we only want to update if iterationNb changes
// 	 */
// 	useEffect(() => {
// 		const toUpdate = involvedVariables.reduce((acc, { name: iv, depth }) => {
// 			if (bindings[iv]) {
// 				if (iterationNb === bindings[iv].length) return acc;
// 				if (iterationNb <= bindings[iv].length)
// 					return {
// 						...acc,
// 						[iv]: [...bindings[iv].splice(0, iterationNb)],
// 					};
// 				return {
// 					...acc,
// 					[iv]: [
// 						...bindings[iv],
// 						...new Array(iterationNb - bindings[iv].length).fill(
// 							U.buildEmptyValue(depth)
// 						),
// 					],
// 				};
// 			}
// 			return acc;
// 		}, {});
// 		if (Object.keys(toUpdate).length !== 0) handleChange(toUpdate);
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [iterationNb]);

// 	useEffect(() => {
// 		if (todos.length !== 0) {
// 			const todosObj = todos.reduce((acc, { up, rowNumber }) => {
// 				const entries = Object.entries(up);
// 				if (entries.length === 0) return acc;
// 				const toUpdate = entries.reduce((_, [key, value]) => {
// 					const previousValue = bindings[key];
// 					const newValue = previousValue.map((v, i) =>
// 						i === rowNumber ? value : v
// 					);
// 					return { ..._, [key]: newValue };
// 				}, {});

// 				return { ...acc, ...toUpdate };
// 			}, {});
// 			handleChange(todosObj);
// 			setTodos([]);
// 		}
// 	}, [bindings, todos, handleChange]);

// 	const flattenComponents = U.buildLoopComponents(iterationNb)(components);

// 	const { currentIteration, currentPageWithoutAnyIteration } = U.splitPage(
// 		currentPage,
// 		loopDepth
// 	);

// 	const localCache = {};

// 	const loopComponents = flattenComponents.reduce(
// 		(
// 			acc,
// 			{
// 				componentType,
// 				id: idC,
// 				rowNumber,
// 				conditionFilter,
// 				page,
// 				bindingDependencies = [],
// 				missingResponse,
// 				...rest
// 			}
// 		) => {
// 			const loopVars = bindingDependencies.map((b) => {
// 				if (bindings[b]) return [b, bindings[b]];
// 				return [b, null];
// 			});
// 			const loopBindings = U.buildLoopBindings(rowNumber)(loopVars);

// 			const loopMissingResponse =
// 				U.buildLoopMissingResponse(rowNumber)(missingResponse);

// 			if (!U.displayLoopQuestion(bindingDependencies)(loopBindings)) return acc;
// 			const Component = lunatic[componentType];

// 			const { bindingDependencies: filterDependencies = [], value = '' } =
// 				conditionFilter;

// 			const filterVars = filterDependencies.map((b) => {
// 				if (bindings[b]) return [b, bindings[b]];
// 				return [b, null];
// 			});
// 			const filterBindings = U.buildLoopBindings(rowNumber)(filterVars);
// 			const set = () => {
// 				const v = interpret(featuresWithoutMD)(filterBindings)(value);
// 				localCache[`${value}-row-${rowNumber}`] = v;
// 				return v;
// 			};

// 			const filterResult = localCache[value] || set();

// 			if (
// 				!filterResult ||
// 				(pagination &&
// 					(currentPageWithoutAnyIteration !== page ||
// 						(paginatedLoop && rowNumber + 1 !== currentIteration)))
// 			)
// 				return acc;
// 			return [
// 				...acc,
// 				<div key={`${idC}-loop-${rowNumber}`} className="loop-component">
// 					<Component
// 						{...orchetratorProps}
// 						{...rest}
// 						id={`${idC}-loop-${rowNumber}`}
// 						handleChange={(up) => {
// 							setTodos((t) => [...t, { up, rowNumber }]);
// 						}}
// 						bindings={loopBindings}
// 						fullBindings={bindings}
// 						bindingDependencies={bindingDependencies}
// 						componentType={componentType}
// 						pagination={pagination}
// 						currentPage={currentPage}
// 						conditionFilter={conditionFilter}
// 						missingResponse={loopMissingResponse}
// 					/>
// 				</div>,
// 			];
// 		},
// 		[]
// 	);

// 	return (
// 		<div id={`loop-${id}`} className="lunatic-loop">
// 			{loopComponents}
// 		</div>
// 	);
// };

function Loop({ children, id, ...rest }) {
	return (
		<div id={`loop-${id}`} className="lunatic-loop">
			<span>TODO: afficher le contenu du composant Loop</span>
		</div>
	);
}

export default React.memo(Loop, U.areEqual);

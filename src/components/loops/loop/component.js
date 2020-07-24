import React, { useEffect } from 'react';
import * as lunatic from '../../components';
import { buildLoopComponents } from './build-components';
import { interpret } from '../../../utils/to-expose';
import * as U from '../../../utils/lib';
import './loop.scss';

const Loop = ({
	id,
	label,
	iterations,
	components,
	bindings,
	handleChange,
	...orchetratorProps
}) => {
	const vectorialBindings = U.buildVectorialBindings(bindings);
	const { features } = orchetratorProps;
	const iterationNb = interpret(features)(vectorialBindings)(iterations);
	const involvedVariables = U.getInvolvedVariables(components);
	const dataVectors = U.getDataVectors(components);
	console.log(dataVectors);

	const onChange = (index) => (obj) => {
		const [name, value] = Object.entries(obj)[0];
		const oldValue = bindings[name];
		const newValue = oldValue.map((v, i) => (i === index ? value : v));
		handleChange({ [name]: newValue });
	};

	useEffect(() => {
		involvedVariables.forEach((iv) => {
			if (bindings[iv].length !== iterationNb) {
				if (iterationNb > bindings[iv].length)
					handleChange({
						[iv]: [
							...bindings[iv],
							...new Array(iterationNb - bindings[iv].length).fill(null),
						],
					});
			}
		});
	}, [iterationNb, bindings, handleChange, involvedVariables]);

	const flattenComponents = buildLoopComponents(iterationNb)(components);

	const loopComponents = flattenComponents.map(
		({ componentType, loopIndex, id, ...rest }) => {
			const loopBindings = U.buildBindingsForDeeperComponents(loopIndex)(
				bindings
			);
			const Component = lunatic[componentType];
			return (
				<div key={`${id}-loop-${loopIndex}`} className="loop-component">
					<Component
						{...orchetratorProps}
						{...rest}
						id={`${id}-loop-${loopIndex}`}
						handleChange={(e) => onChange(loopIndex)(e)}
						bindings={loopBindings}
					/>
				</div>
			);
		}
	);

	return (
		<div id={`loop-${id}`} className="lunatic-loop">
			<div className="loop-label">{label}</div>
			{loopComponents}
		</div>
	);
};

export default React.memo(Loop, U.areEqual);

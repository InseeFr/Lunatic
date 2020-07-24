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
	const dataVectors = U.getDataVectors(components);

	const onChange = (index) => (obj) => {
		const [name, value] = Object.entries(obj)[0];
		const oldValue = bindings[name];
		const newValue = oldValue.map((v, i) => (i === index ? value : v));
		handleChange({ [name]: newValue });
	};

	const flattenComponents = buildLoopComponents(iterationNb)(components);

	const loopComponents = flattenComponents.map(
		({ componentType, id, ...rest }, i) => {
			const loopBindings = U.buildBindingsForDeeperComponents(i)(bindings);
			const Component = lunatic[componentType];
			return (
				<div key={`${id}-loop-${i}`} className="loop-component">
					<Component
						{...orchetratorProps}
						{...rest}
						id={`${id}-loop-${i}`}
						handleChange={(e) => onChange(i)(e)}
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

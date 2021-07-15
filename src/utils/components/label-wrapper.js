import React from 'react';
import * as U from '../lib';
import { interpret } from '..//to-expose';

function LabelWrapper({
	children,
	id,
	labelPosition,
	bindings,
	label,
	features,
	logFunction,
}) {
	const labelId = `suggester-label-${id}`;
	return (
		<div className={U.getLabelPositionClass(labelPosition)}>
			{label && (
				<label htmlFor={`suggester-${id}`} id={labelId}>
					{interpret(features, logFunction)(bindings)(label)}
				</label>
			)}
			{children}
		</div>
	);
}

export default LabelWrapper;

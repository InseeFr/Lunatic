import React from 'react';
import * as U from '../lib';
import { interpret } from '../to-expose';

function LabelWrapper({
	children,
	id,
	htmlFor,
	labelPosition,
	bindings,
	label,
	features,
	logFunction,
}) {
	const labelId = `${htmlFor}-${id}`;
	return (
		<div className={U.getLabelPositionClass(labelPosition)}>
			{label && (
				<label htmlFor={`${htmlFor}`} id={labelId}>
					{interpret(features, logFunction)(bindings)(label)}
				</label>
			)}
			{children}
		</div>
	);
}

export default LabelWrapper;

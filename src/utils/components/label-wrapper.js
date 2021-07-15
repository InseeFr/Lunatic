import React from 'react';
import classnames from 'classnames';
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
	const position = U.getLabelPositionClass(labelPosition);
	return (
		<div
			className={classnames('lunatic-component-container', `${position}-ex`)}
		>
			{label && (
				<label
					className={classnames('lunatic-label')}
					htmlFor={htmlFor}
					id={`${htmlFor}-${id}`}
				>
					{interpret(features, logFunction)(bindings)(label)}
				</label>
			)}
			{children}
		</div>
	);
}

export default LabelWrapper;

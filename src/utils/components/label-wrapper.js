import React from 'react';
import classnames from 'classnames';
import * as U from '../lib';
import { interpret } from '../to-expose';

function Label({ htmlFor, features, logFunction, bindings, label, id }) {
	if (label) {
		return (
			<label className={classnames('lunatic-label')} htmlFor={htmlFor} id={id}>
				{interpret(features, logFunction)(bindings)(label)}
			</label>
		);
	}
	return undefined;
}

function LabelWrapper({
	children,
	id,
	htmlFor = '',
	labelPosition = '',
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
			<Label
				id={id}
				htmlFor={htmlFor}
				bindings={bindings}
				label={label}
				features={features}
				logFunction={logFunction}
			/>
			{children}
		</div>
	);
}

export default LabelWrapper;

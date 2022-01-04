import React from 'react';
import classnames from 'classnames';
import './field-container.scss';

function Tooltip({ management, id }) {
	if (management) {
		return <div className="tooltip"></div>;
	}
	return null;
}

function FieldContainer({ children, management, value, id }) {
	return (
		<div className="field-container">
			<div
				className={classnames({
					'field-with-tooltip': management,
					field: !management,
				})}
			>
				{children}
			</div>
			<Tooltip management={management} value={value} id={id} />
		</div>
	);
}

export default FieldContainer;

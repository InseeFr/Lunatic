import React from 'react';
import classnames from 'classnames';

function FieldContainer({ children, management }) {
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
		</div>
	);
}

export default FieldContainer;

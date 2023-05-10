import React from 'react';
import classnames from 'classnames';
import Description from '../../../commons/components/description';

function Legend({ children, id, className, description }) {
	if (children) {
		return (
			<>
				<legend id={id} className={classnames('lunatic-legend', className)}>
					{children}
				</legend>
				<Description value={description} />
			</>
		);
	}
	return null;
}

export default Legend;

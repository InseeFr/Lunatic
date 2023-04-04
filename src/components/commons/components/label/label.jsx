import React from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../../create-customizable-field';
import Description from '../description';
import './label.scss';

function Label({ children, id, htmlFor, className, style, description }) {
	if (children) {
		return (
			<label
				htmlFor={htmlFor}
				id={id}
				className={classnames('lunatic-label', className)}
				style={style}
			>
				{children}
				<Description value={description} />
			</label>
		);
	}
	return null;
}

export default createCustomizableLunaticField(Label, 'Label');

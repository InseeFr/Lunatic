import React from 'react';
import {
	CheckboxChecked,
	CheckboxUnchecked,
	RadioChecked,
	RadioUnchecked,
} from './assets';
import './icon.scss';

const Content = ({ type, checked }) => {
	if (type === 'radio') {
		if (checked) return <RadioChecked />;
		return <RadioUnchecked />;
	}
	if (type === 'checkbox') {
		if (checked) return <CheckboxChecked />;
		return <CheckboxUnchecked />;
	}
	return null;
};

const Icon = ({ type, checked, disabled, children }) => (
	<span className={`list-icon-wrapper`}>
		<span className={`list-icon ${disabled ? 'list-icon-disabled' : ''}`}>
			<Content type={type} checked={checked} />
		</span>
		{children}
	</span>
);

export default Icon;

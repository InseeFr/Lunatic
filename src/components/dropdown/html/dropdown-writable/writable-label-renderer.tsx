import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { ComboBoxOption } from '../../../commons/components/combo-box/combo-box.type';

type Props = {
	option: ComboBoxOption;
	placeholder?: string;
	search?: string;
};

function getContent(option: Props['option'], search?: string) {
	if (option) {
		const { value, label } = option;
		if (isValidElement(label)) {
			return label;
		}
		return label ? `${value} - ${label}` : value;
	}
	if (search && search.trim().length) {
		return search;
	}
	return null;
}

function WritableLabelRenderer({ option, placeholder, search }: Props) {
	const content = getContent(option, search);
	if (content) {
		return <span className="selection">{content}</span>;
	}
	return <span className="placeholder">{placeholder}</span>;
}

export default WritableLabelRenderer;

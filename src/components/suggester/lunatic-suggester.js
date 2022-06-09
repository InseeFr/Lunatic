import React from 'react';
import PropTypes from 'prop-types';
import IDBSuggester from './idb-suggester';
import { createLunaticComponent } from '../commons';
import * as commonPropTypes from '../commons/prop-types';
import { COLLECTED } from 'utils/constants';

function LunaticSuggester(props) {
	const {
		id,
		storeName,
		optionRenderer,
		labelRenderer,
		idbVersion,
		focused,
		value,
		onChange,
		disabled,
		labelId,
		custom,
	} = props;

	return (
		<IDBSuggester
			storeName={storeName}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			labelledBy={labelId}
			idbVersion={idbVersion}
			onSelect={onChange}
			focused={focused}
			disabled={disabled}
			id={id}
			value={value}
			custom={custom}
		/>
	);
}

LunaticSuggester.defaultProps = {
	label: '',
	preferences: [COLLECTED],
	response: {},
	disabled: false,
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	management: false,
	labelPosition: 'DEFAULT',
	style: {},
	getStoreInfo: undefined,
};

LunaticSuggester.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(commonPropTypes.valueTypePropTypes),
	response: commonPropTypes.responsePropTypes,
	handleChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: commonPropTypes.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	management: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	style: PropTypes.object,
	storeInfo: PropTypes.object, //TODO
	getStoreInfo: PropTypes.func,
};

export default createLunaticComponent(LunaticSuggester);

import React from 'react';
import PropTypes from 'prop-types';
import IDBSuggester from './idb-suggester';
import { useOnHandleChange, LunaticField } from '../commons';
import * as U from '../../utils/lib';

function LunaticSuggester(props) {
	const {
		storeName,
		optionRenderer,
		labelRenderer,
		idbVersion,
		id,
		focused,
		value,
		disabled,
		label,
		declarations,
		handleChange,
		response,
		custom,
	} = props;

	const contentId = `lunatic-suggester-${id}`;
	const labelId = `lunatic-suggester-label-${id}`;

	const onSelect = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticField
			label={label}
			contentId={contentId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-suggester-label"
		>
			<IDBSuggester
				storeName={storeName}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				labelledBy={labelId}
				idbVersion={idbVersion}
				onSelect={onSelect}
				focused={focused}
				disabled={disabled}
				id={contentId}
				value={value}
				custom={custom}
			/>
		</LunaticField>
	);
}

LunaticSuggester.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
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
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	handleChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	management: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	style: PropTypes.object,
	storeInfo: PropTypes.object, //TODO
	getStoreInfo: PropTypes.func,
};

export default React.memo(LunaticSuggester);

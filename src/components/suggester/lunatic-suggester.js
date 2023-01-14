import React from 'react';
import PropTypes from 'prop-types';
import IDBSuggester from './idb-suggester';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import * as commonPropTypes from '../commons/prop-types';
import { COLLECTED } from '../../utils/constants';

function LunaticSuggester(props) {
	const {
		id,
		storeName,
		optionRenderer,
		labelRenderer,
		idbVersion,
		focused,
		value,
		handleChange,
		disabled,
		custom,
		errors,
		label,
		description,
		preferences,
		declarations,
		missing,
		missingResponse,
		management,
		response,
	} = props;

	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			id={id}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
		>
			<IDBSuggester
				storeName={storeName}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				idbVersion={idbVersion}
				onSelect={onChange}
				focused={focused}
				disabled={disabled}
				id={id}
				value={value}
				custom={custom}
				errors={errors}
				label={label}
			/>
		</LunaticComponent>
	);
}

LunaticSuggester.defaultProps = {
	labelId: '',
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
	label: undefined,
	description: undefined,
	errors: undefined,
};

LunaticSuggester.propTypes = {
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string,
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

export default LunaticSuggester;

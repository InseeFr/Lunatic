import React from 'react';
import PropTypes from 'prop-types';
import IDBSuggester from './idb-suggester';
import { FieldContainer, Label, useOnHandleChange } from '../commons';
import * as U from '../../utils/lib';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';

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
	} = props;

	const inputId = `lunatic-suggester-${id}`;
	const labelId = `lunatic-suggester-label-${id}`;

	const onSelect = useOnHandleChange({ handleChange, response, value });

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<Label id={labelId} htmlFor={inputId} className={''}>
				{label}
			</Label>
			<DeclarationsAfterText declarations={declarations} />
			<FieldContainer value={value} id={id}>
				<IDBSuggester
					storeName={storeName}
					optionRenderer={optionRenderer}
					labelRenderer={labelRenderer}
					labelledBy={labelId}
					idbVersion={idbVersion}
					onSelect={onSelect}
					focused={focused}
					disabled={disabled}
					id={inputId}
					value={value}
				/>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
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

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import { interpret } from '../../utils/to-expose';
import IDBSuggester from './idb-suggester';

const Suggester = ({
	id,
	label,
	preferences,
	response,
	handleChange,
	disabled,
	positioning,
	focused,
	declarations,
	features,
	bindings,
	management,
	labelPosition,
	style,
	logFunction,
	storeName,
	optionRenderer,
	labelRenderer,
	max,
	idbVersion,
}) => {
	const labelId = `suggester-label-${id}`;
	const onSelect = useCallback(
		function (suggestion) {
			const { id } = suggestion;
			if (id) {
				handleChange({
					[U.getResponseName(response)]: id,
				});
			}
		},
		[handleChange, response]
	);

	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<div className={U.getLabelPositionClass(labelPosition)}>
				{label && (
					<label htmlFor={`suggester-${id}`} id={labelId}>
						{interpret(features, logFunction)(bindings)(label)}
					</label>
				)}
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
					features={features}
					bindings={bindings}
				/>
				<div className="field-container">
					<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
						<IDBSuggester
							storeName={storeName}
							optionRenderer={optionRenderer}
							labelRenderer={labelRenderer}
							max={max}
							labelledBy={labelId}
							idbVersion={idbVersion}
							onSelect={onSelect}
							focused={focused}
							disabled={disabled}
							response={response}
						/>
					</div>
					{management && (
						<div className="tooltip">
							<TooltipResponse
								id={id}
								response={U.buildBooleanTooltipResponse(response)}
							/>
						</div>
					)}
				</div>
			</div>
			<Declarations
				id={id}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</>
	);
};

Suggester.defaultProps = {
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

Suggester.propTypes = {
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
	path: PropTypes.string.isRequired,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	style: PropTypes.object,
	storeInfo: PropTypes.object, //TODO
	getStoreInfo: PropTypes.func,
};

export default React.memo(Suggester, U.areEqual);

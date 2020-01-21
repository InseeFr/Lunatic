import React from 'react';
import PropTypes from 'prop-types';
import DropdownSimple from './dropdown-simple';
import DropdownEdit from './dropdown-edit';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import { interpret } from '../../utils/to-expose';
import './dropdown.scss';

const Dropdown = ({
	id,
	label,
	preferences,
	response,
	handleChange,
	options,
	writable,
	declarations,
	features,
	bindings,
	tooltip,
	...rest
}) => {
	const interpretedLabel = interpret(features)(bindings)(label);
	const value = U.getResponseByPreference(preferences)(response);
	const interpretedOptions = options.map(({ value, label: labelOption }) => ({
		value,
		label: interpret(features)(bindings)(labelOption),
	}));
	const onSelect = e =>
		handleChange({
			[U.getResponseName(response)]: e.value,
		});
	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<Declarations
				id={id}
				type={C.AFTER_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			{writable ? (
				<DropdownEdit
					{...rest}
					id={id}
					value={value}
					response={response}
					label={interpretedLabel}
					options={interpretedOptions}
					onSelect={onSelect}
					tooltip={tooltip}
				/>
			) : (
				<DropdownSimple
					{...rest}
					id={id}
					value={value}
					response={response}
					label={interpretedLabel}
					options={interpretedOptions}
					onSelect={onSelect}
					tooltip={tooltip}
				/>
			)}
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

Dropdown.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string,
		PropTypes.number,
	]),
	disabled: PropTypes.bool,
	writable: PropTypes.bool,
	handleChange: PropTypes.func,
	label: PropTypes.string,
	className: PropTypes.string,
	zIndex: PropTypes.number,
	handleChange: PropTypes.func,
};

Dropdown.defaultProps = {
	value: undefined,
	writable: false,
	handleChange: () => null,
	label: undefined,
	className: undefined,
	zIndex: 0,
	disabled: false,
	handleChange: () => null,
};

export default Dropdown;

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import componentWrapper from '../component-wrapper';
import DropdownSimple from './dropdown-simple';
import DropdownEdit from './dropdown-edit';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import { interpret } from '../../utils/to-expose';
import './dropdown.scss';

// function compileFeatures(features = []) {
// 	return features.reduce((acc, f) => (f === 'MD' ? acc : [...acc, f]), []);
// }

// const Dropdown = ({
// 	id,
// 	label,
// 	preferences,
// 	response,
// 	handleChange,
// 	options,
// 	writable,
// 	declarations,
// 	features,
// 	bindings,
// 	management,
// 	freezeOptions,
// 	...rest
// }) => {
// 	const [opts, setOpts] = useState(options);

// 	//TODO: improve feature support for MD, adding plainText to options & search input
// 	const updatedFeatures = useMemo(() => compileFeatures(features), [features]);

// 	useEffect(() => {
// 		if (!freezeOptions) {
// 			const featOptions = options.map(
// 				({ label: labelOption, ...restOpts }) => ({
// 					label: interpret(updatedFeatures)(bindings)(labelOption),
// 					...restOpts,
// 				})
// 			);
// 			setOpts(featOptions);
// 		}
// 	}, [freezeOptions, updatedFeatures, features, bindings, options]);

// 	const interpretedLabel = interpret(features, rest?.logFunction)(bindings)(
// 		label
// 	);
// 	const value = U.getResponseByPreference(preferences)(response);

// 	const onSelect = (e) =>
// 		handleChange({
// 			[U.getResponseName(response)]: e.value,
// 		});

// 	const DeclarationAfterLabel = () => (
// 		<Declarations
// 			id={id}
// 			type={C.AFTER_QUESTION_TEXT}
// 			declarations={declarations}
// 			features={features}
// 			bindings={bindings}
// 		/>
// 	);

// 	return (
// 		<>
// 			<Declarations
// 				id={id}
// 				type={C.BEFORE_QUESTION_TEXT}
// 				declarations={declarations}
// 				features={features}
// 				bindings={bindings}
// 			/>
// 			{writable ? (
// 				<DropdownEdit
// 					{...rest}
// 					id={id}
// 					value={value}
// 					response={response}
// 					label={interpretedLabel}
// 					options={opts}
// 					onSelect={onSelect}
// 					management={management}
// 					DeclarationAfterLabel={DeclarationAfterLabel}
// 				/>
// 			) : (
// 				<DropdownSimple
// 					{...rest}
// 					id={id}
// 					value={value}
// 					response={response}
// 					label={interpretedLabel}
// 					options={opts}
// 					onSelect={onSelect}
// 					management={management}
// 					DeclarationAfterLabel={DeclarationAfterLabel}
// 				/>
// 			)}
// 			<Declarations
// 				id={id}
// 				type={C.DETACHABLE}
// 				declarations={declarations}
// 				features={features}
// 				bindings={bindings}
// 			/>
// 		</>
// 	);
// };

// Dropdown.propTypes = {
// 	disabled: PropTypes.bool,
// 	writable: PropTypes.bool,
// 	features: PropTypes.arrayOf(PropTypes.string),
// 	handleChange: PropTypes.func,
// 	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
// 	className: PropTypes.string,
// 	zIndex: PropTypes.number,
// 	freezeOptions: PropTypes.bool,
// };

// Dropdown.defaultProps = {
// 	writable: false,
// 	handleChange: () => null,
// 	features: [],
// 	label: undefined,
// 	className: undefined,
// 	zIndex: 0,
// 	disabled: false,
// 	freezeOptions: false,
// };

// export default componentWrapper(React.memo(Dropdown, U.areEqual));

function Dropdown() {
	return null;
}

export default Dropdown;

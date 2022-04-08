import React from 'react';
import useOnHandleChange from '../../use-on-handle-change';
import LunaticComponent from '../lunatic-component';
import LunaticFieldsetComponent from '../lunatic-fieldset-component';

/*
	Pour le moment HOC utilisé pour :
		Input
		InputNumber
		DatePicker
		Switch
		Dropdown
		Suggester


*/

function getComponent(fieldset) {
	if (fieldset) {
		return LunaticFieldsetComponent;
	}
	return LunaticComponent;
}

function createLunaticComponent(
	HtmlComponent,
	{
		labelId = 'lunatic-label',
		inputId = 'lunatic-input',
		fieldset = false,
	} = {}
) {
	const Memoized = React.memo(HtmlComponent);

	return function LunaticHandlerComponent(props) {
		const {
			id,
			label,
			custom,
			preferences,
			declarations,
			className,
			value,
			handleChange,
			response,
		} = props;

		const inputId_ = `${inputId}-${id}`;
		const labelId_ = `${labelId}-${id}`;
		const Component = getComponent(fieldset);
		const onChange = useOnHandleChange({ handleChange, response, value });

		return (
			<Component
				id={id}
				labelId={labelId_}
				inputId={inputId_}
				label={label}
				custom={custom}
				preferences={preferences}
				declarations={declarations}
				className={className}
				value={value}
			>
				<Memoized
					{...props}
					onChange={onChange}
					id={inputId_}
					labelId={labelId_}
				/>
			</Component>
		);
	};
}

export default createLunaticComponent;

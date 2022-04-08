import React from 'react';
import useOnHandleChange from '../../use-on-handle-change';
import LunaticComponent from '../lunatic-component';

/*
	Pour le moment HOC utilisé pour :
		Input
		InputNumber
		DatePicker
		Switch
		Dropdown
		Suggester


*/

function createLunaticComponent(
	HtmlComponent,
	{ labelId = 'lunatic-label', inputId = 'lunatic-input', ...initialProps } = {}
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

		const onChange = useOnHandleChange({ handleChange, response, value });

		return (
			<LunaticComponent
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
					{...initialProps}
					onChange={onChange}
					id={inputId_}
					labelId={labelId_}
				/>
			</LunaticComponent>
		);
	};
}

export default createLunaticComponent;

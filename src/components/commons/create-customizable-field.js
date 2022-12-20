import React from 'react';

function createCustomizableLunaticField(LunaticField, name) {
	const Memoized = React.memo(LunaticField);

	return function OverlayField(props) {
		const { custom, ...rest } = props;

		if (typeof custom === 'object' && name in custom) {
			const CustomComponent = custom[name];
			return <CustomComponent {...rest} />;
		}

		return <Memoized {...props} />;
	};
}

export default createCustomizableLunaticField;

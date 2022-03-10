import React from 'react';

function createCustomizableLunaticField(LunaticField) {
	return function OverlayField(props) {
		const { custom: Custom, ...rest } = props;
		if (typeof Custom === 'function') {
			return <Custom {...rest} />;
		}
		return <LunaticField {...rest} />;
	};
}

export default createCustomizableLunaticField;

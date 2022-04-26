import getComponentValue from '../get-component-value';

function fillComponentValue(component, state) {
	const value = getComponentValue(component, state);
	return { ...component, value };
}

export default fillComponentValue;

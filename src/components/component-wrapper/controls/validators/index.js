import { minMaxValidatorInputNumber } from './input-number';
import { minMaxValidatorDatepicker } from './datepicker';
import * as U from '../../../../utils/lib';

export const getTypeControls = (props) => {
	const { min, max, value, response, preferences, componentType, id } = props;
	const v =
		value || value === null
			? value
			: U.getResponseByPreference(preferences)(response);
	if (componentType === 'InputNumber')
		return minMaxValidatorInputNumber({ id, min, max })(v);
	if (componentType === 'Datepicker')
		return minMaxValidatorDatepicker({ id, min, max })(v);
	return null;
};

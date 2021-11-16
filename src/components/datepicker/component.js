import React from 'react';
import PropTypes from 'prop-types';
import compareAsc from 'date-fns/compareAsc';
import format from 'date-fns/format';
import missingWrapper from '../missing-wrapper';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './datepicker.scss';

const Datepicker = (props) => {
	const { min, max, validators } = props;
	return (
		<InputDeclarationsWrapper
			type="date"
			roleType="datepicker"
			{...props}
			validators={[minMaxValidator({ min, max }), ...validators]}
			max={max || '1979-12-31'}
		/>
	);
};

const minMaxValidator =
	({ min, max }) =>
	(value) => {
		if (!value) {
			return undefined;
		}
		const dateFormat = 'dd/MM/yyyy';
		const date = new Date(value);
		const minDate = min ? new Date(min) : null;
		const maxDate = max ? new Date(max) : null;
		const minDateAsString = minDate ? format(minDate, dateFormat) : '';
		const maxDateAsString = maxDate ? format(maxDate, dateFormat) : '';
		if (!min && isDef(max) && compareAsc(date, maxDate) > 0)
			return (
				<span>{`La date doit être inférieure au ${maxDateAsString}`}</span>
			);
		else if (isDef(min) && !max && compareAsc(date, minDate) > 0)
			return (
				<span>{`La date doit être supérieure au ${minDateAsString}`}</span>
			);
		else if (isDef(min) && isDef(max) && (date < minDate || date > maxDate))
			return (
				<span>{`La date doit être comprise entre le ${minDateAsString} et le ${maxDateAsString}`}</span>
			);
		return undefined;
	};

const isDef = (d) => d;

Datepicker.defaultProps = {
	validators: [],
};

Datepicker.propTypes = {
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default missingWrapper(React.memo(Datepicker, areEqual));

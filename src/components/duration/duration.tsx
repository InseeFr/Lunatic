import { useState, useEffect, ChangeEvent } from 'react';
import './duration.scss';

interface DurationValues {
	years: string;
	months: string;
	hours: string;
	minutes: string;
	format: string;
}

const Duration = ({
	initialValue,
	label,
	format,
}: {
	initialValue: string;
	label: string;
	format: string;
}) => {
	const [years, setYears] = useState<string>('');
	const [months, setMonths] = useState<string>('');
	const [hours, setHours] = useState<string>('');
	const [minutes, setMinutes] = useState<string>('');
	const [selectedFormat, setSelectedFormat] = useState<string>('PTnHnM');

	useEffect(() => {
		const parsedValue = parseISO8601Duration(initialValue);
		setDurationValues(parsedValue);
		setSelectedFormat(parsedValue.format);
	}, [initialValue]);

	const setDurationValues = (values: DurationValues) => {
		setYears(values.years || '');
		setMonths(values.months || '');
		setHours(values.hours || '');
		setMinutes(values.minutes || '');
	};

	const handleYearsChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setYears(value);
	};

	const handleMonthsChange = (event: ChangeEvent<HTMLInputElement>) => {
		let { value } = event.target;
		if (parseInt(value) > 11) {
			value = '11';
		}
		setMonths(value);
	};

	const handleHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
		let { value } = event.target;
		if (parseInt(value) > 23) {
			value = '23';
		}
		setHours(value);
	};

	const handleMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
		let { value } = event.target;
		if (parseInt(value) > 59) {
			value = '59';
		}
		setMinutes(value);
	};

	const handleFormatChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSelectedFormat(value);
	};

	const formatISO8601Duration = (): string => {
		if (selectedFormat === 'PTnHnM') {
			return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}`;
		}

		if (selectedFormat === 'PnYnM') {
			return `P${years ? `${years}Y` : ''}${months ? `${months}M` : ''}`;
		}

		return '';
	};

	const parseISO8601Duration = (duration: string): DurationValues => {
		const regexHourMinute = /PT(\d+H)?(\d+M)?/i;
		const matchHourMinute = duration.match(regexHourMinute);
		if (matchHourMinute) {
			const [, hours, minutes] = matchHourMinute;
			return {
				format: 'PTnHnM',
				hours: hours ? hours.replace('H', '') : '',
				minutes: minutes ? minutes.replace('M', '') : '',
				years: '',
				months: '',
			};
		}

		const regexYearMonth = /P(\d+Y)?(\d+M)?/i;
		const matchYearMonth = duration.match(regexYearMonth);
		if (matchYearMonth) {
			const [, years, months] = matchYearMonth;
			return {
				format: 'PnYnM',
				years: years ? years.replace('Y', '') : '',
				months: months ? months.replace('M', '') : '',
				hours: '',
				minutes: '',
			};
		}

		return {
			format: 'PTnHnM',
			hours: '',
			minutes: '',
			years: '',
			months: '',
		};
	};

	return (
		<div className="container">
			{label}
			<div>
				<label className="radio-label">
					<input
						type="radio"
						value="PTnHnM"
						checked={selectedFormat === 'PTnHnM'}
						onChange={handleFormatChange}
						className="input-field-radio"
					/>
					Heures et minutes
				</label>
				<label className="radio-label">
					<input
						type="radio"
						value="PnYnM"
						checked={selectedFormat === 'PnYnM'}
						onChange={handleFormatChange}
						className="input-field-radio"
					/>
					Années et mois
				</label>
			</div>
			{selectedFormat === 'PTnHnM' && (
				<div className="field-group">
					<div className="input-field-group">
						<label htmlFor="hoursInput" className="input-label">
							Heures:
						</label>
						<input
							id="hoursInput"
							type="number"
							value={hours}
							onChange={handleHoursChange}
							min="0"
							className="input-field"
						/>
					</div>
					<div className="input-field-group">
						<label htmlFor="minutesInput" className="input-label">
							Minutes:
						</label>
						<input
							id="minutesInput"
							type="number"
							value={minutes}
							onChange={handleMinutesChange}
							min="0"
							className="input-field"
						/>
					</div>
				</div>
			)}
			{selectedFormat === 'PnYnM' && (
				<div className="field-group">
					<div className="input-field-group">
						<label htmlFor="yearsInput" className="input-label">
							Années:
						</label>
						<input
							id="yearsInput"
							type="number"
							value={years}
							onChange={handleYearsChange}
							min="0"
							className="input-field"
						/>
					</div>
					<div className="input-field-group">
						<label htmlFor="monthsInput" className="input-label">
							Mois:
						</label>
						<input
							id="monthsInput"
							type="number"
							value={months}
							onChange={handleMonthsChange}
							min="0"
							className="input-field"
						/>
					</div>
				</div>
			)}
			<span>Format ISO 8601: {formatISO8601Duration()}</span>
		</div>
	);
};

export default Duration;

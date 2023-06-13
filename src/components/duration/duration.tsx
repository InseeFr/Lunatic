import React from 'react';
import './duration.scss';
import { useDurationValues } from './useDurationValues';
import { useOnHandleChange } from '../commons';
import { LunaticComponentProps } from '../type';
import LunaticComponent from '../commons/components/lunatic-component-without-label';

function Duration(props: LunaticComponentProps<'Duration'>) {
	const {
		value,
		label,
		format,
		handleChange,
		response,
		id,
		preferences,
		declarations,
		missing,
		missingResponse,
		management,
		description,
	} = props;
	const onChange = useOnHandleChange({
		handleChange,
		response,
		value,
	});

	const { propsHours, propsMinutes, propsYears, propsMonths } =
		useDurationValues(value, format, onChange);
	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<div className="container">
				{label}
				<div></div>
				{format === 'PTnHnM' && (
					<div className="field-group">
						<div className="input-field-group">
							<label htmlFor="hoursInput" className="input-label">
								Heures:
							</label>
							<input
								id="hoursInput"
								type="number"
								{...propsHours}
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
								{...propsMinutes}
								min="0"
								className="input-field"
							/>
						</div>
					</div>
				)}
				{format === 'PnYnM' && (
					<div className="field-group">
						<div className="input-field-group">
							<label htmlFor="yearsInput" className="input-label">
								Années:
							</label>
							<input
								id="yearsInput"
								type="number"
								{...propsYears}
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
								{...propsMonths}
								min="0"
								className="input-field"
							/>
						</div>
					</div>
				)}
			</div>
		</LunaticComponent>
	);
}

export default Duration;

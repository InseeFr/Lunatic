import React from 'react';
import * as U from '../lib';
import { TooltipResponse } from '../../components/tooltip';

function FieldWrapper({ children, id, management, response }) {
	return (
		<div className="field-container">
			<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
				{children}
			</div>
			{management && (
				<div className="tooltip">
					<TooltipResponse
						id={id}
						response={U.buildBooleanTooltipResponse(response)}
					/>
				</div>
			)}
		</div>
	);
}

export default FieldWrapper;

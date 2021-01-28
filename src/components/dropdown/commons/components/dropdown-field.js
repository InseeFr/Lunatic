import React from 'react';
import classnames from 'classnames';
import { TooltipResponse } from '../../../tooltip';

function DropdownFieldContainer({
	children,
	id,
	options,
	management,
	focused,
	visible,
	disabled,
}) {
	return (
		<div className="field-container">
			<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
				<div
					tabIndex="-1"
					className={classnames('lunatic-dropdown-container', { focused })}
				>
					<span
						className={classnames(`lunatic-dropdown-content`, {
							focused,
							visible,
							disabled,
						})}
					>
						{children}
					</span>
				</div>
			</div>
			{management && (
				<div className="tooltip">
					<TooltipResponse
						id={id}
						response={U.buildMultiTooltipResponse(options)(response)}
					/>
				</div>
			)}
		</div>
	);
}

export default DropdownFieldContainer;

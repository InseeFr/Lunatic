import React from 'react';

function Progress({ display, percent = 0 }) {
	if (display) {
		return (
			<div className="lunatic-suggester-loader-progress">
				<div className="content">
					<div
						className="progress"
						style={{ width: `${Math.round(percent)}%` }}
					></div>
				</div>
			</div>
		);
	}
	return null;
}

export default Progress;

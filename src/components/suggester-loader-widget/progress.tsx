import React from 'react';
import classnames from 'classnames';

type Props = {
	display?: boolean;
	percent?: number;
	handleClick?: (v: number) => void;
};

function Progress({ display, percent = 0, handleClick = () => null }: Props) {
	if (display) {
		return (
			<div
				className={classnames('lunatic-suggester-loader-progress', {
					done: percent === 100,
				})}
				onClick={() => handleClick(percent)}
			>
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

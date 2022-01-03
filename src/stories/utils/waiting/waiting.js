import React from 'react';
import './waiting.scss';
import preloader from './preloader.svg';

function Waiting({ status, children }) {
	if (status) {
		return (
			<div className="waiting">
				<img src={preloader} alt="loading" />
				<div className="content">{children}</div>
			</div>
		);
	}
	return null;
}

Waiting.defaultProps = {
	status: false,
};

export default React.memo(Waiting);

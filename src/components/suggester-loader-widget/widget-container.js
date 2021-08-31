import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

function WidgetContainer({ children, drag, absolute }, containerEl) {
	if (absolute) {
		return ReactDOM.createPortal(
			<div
				className={classnames('lunatic-suggester-widget-container', {
					absolute,
				})}
				ref={containerEl}
			>
				<div className={classnames('lunatic-suggester-widget', { drag })}>
					{children}
				</div>
			</div>,
			document.body
		);
	}
	return (
		<div
			className={classnames('lunatic-suggester-widget-container', {
				absolute,
			})}
			ref={containerEl}
		>
			<div className={classnames('lunatic-suggester-widget', { drag })}>
				{children}
			</div>
		</div>
	);
}

export default React.forwardRef(WidgetContainer);

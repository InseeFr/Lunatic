import React from 'react';

const DropdownContainer = React.forwardRef(function (props, ref) {
	const {
		children,
		className,
		id,
		onMouseDown,
		onKeyDown,
		onFocus,
		onBlur,
	} = props;
	return (
		<div
			className={className}
			tabIndex="-1"
			id={id}
			onMouseDown={onMouseDown}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onBlur={onBlur}
			ref={ref}
		>
			{children}
		</div>
	);
});

export default DropdownContainer;

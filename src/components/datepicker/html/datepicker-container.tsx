import React, { type PropsWithChildren } from 'react';

function DatepickerContainer({ children }: PropsWithChildren) {
	return <div className="lunatic-input">{children}</div>;
}

export default DatepickerContainer;

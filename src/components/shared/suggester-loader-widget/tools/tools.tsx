import React, { type PropsWithChildren } from 'react';

function Tools({ children }: PropsWithChildren) {
	return <div className="lunatic-widget-tools">{children}</div>;
}

export default Tools;

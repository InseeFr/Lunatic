import { PropsWithChildren } from 'react';

function SummaryContainer({ children }: PropsWithChildren) {
	return <div className="lunatic-summary-container">{children}</div>;
}

export default SummaryContainer;

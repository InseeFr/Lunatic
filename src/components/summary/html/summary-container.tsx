import { PropsWithChildren } from 'react';

export function SummaryContainer({ children }: PropsWithChildren) {
	return <div className="lunatic-summary-container">{children}</div>;
}

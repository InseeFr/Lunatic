import { ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';

type SummaryLoopProp = {
	rows?: Array<{
		values: Array<{
			label: ReactNode;
			value: ReactNode;
		}>;
		title: ReactNode;
	}>;
};

function SummaryLoop({ rows }: SummaryLoopProp) {
	const listes = rows?.map((entry, index) => {
		const { values, title } = entry;
		const content = values.map(({ label, value }, index) => {
			return (
				<li key={index}>
					<div>
						{label} : {value}
					</div>
				</li>
			);
		});

		return (
			<div className="lunatic-summary-loop-iteration" key={index}>
				{title}
				<ul>{content}</ul>
			</div>
		);
	});
	return <>{listes}</>;
}

export default createCustomizableLunaticField(SummaryLoop, 'SummaryLoop');

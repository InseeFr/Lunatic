import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';

export const Accordion = slottableComponent<LunaticComponentProps<'Accordion'>>(
	'Accordion',
	function Accordion({ items }) {
		return (
			<div className="lunatic-accordion">
				{items.map((item, k) => (
					<details key={k}>
						<summary>{item.label}</summary>
						{item.body}
					</details>
				))}
			</div>
		);
	}
);

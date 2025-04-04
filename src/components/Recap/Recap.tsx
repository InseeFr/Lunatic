import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';

/**
 * Display a page that list collected data
 */
export const Recap = slottableComponent<LunaticComponentProps<'Recap'>>(
	'Recap',
	function Recap({ label, fields }) {
		return (
			<div>
				<h2>{label}</h2>
				<ul>
					{fields.map((field) => (
						<li>
							<strong>{field.label}</strong>
							<RecapList value={field.value} />
						</li>
					))}
				</ul>
			</div>
		);
	}
);

function RecapList({ value }: { value: string | string[] }) {
	if (Array.isArray(value)) {
		return (
			<ul>
				{value.map((v) => (
					<li key={v}>{v}</li>
				))}
			</ul>
		);
	}
	return value;
}

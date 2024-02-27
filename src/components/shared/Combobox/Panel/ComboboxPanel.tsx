import { ComboboxOptionContainer } from './ComboboxOptionContainer';
import type { ComboboxPanelProps } from '../ComboboxType';
import { ComboboxPanelContainer } from './ComboboxPanelContainer';
import { ComboboxOption } from './ComboboxOption';

/**
 * Floating menu containing selectable options
 */
export function ComboboxPanel({
	optionRenderer: OptionRender,
	options = [],
	focused,
	selectedIndex,
	expanded,
	id,
	search,
	onSelect,
}: ComboboxPanelProps) {
	const visibleOptions = expanded ? options : [];

	const ComboBoxOptionComponent = OptionRender ?? ComboboxOption;
	return (
		<ComboboxPanelContainer
			expanded={expanded}
			focused={focused}
			id={`${id}-list`}
		>
			{visibleOptions.map((option, index) => (
				<ComboboxOptionContainer
					key={option.id ?? option.value}
					index={index.toString()}
					selected={selectedIndex === index}
					onSelect={onSelect}
				>
					<ComboBoxOptionComponent
						option={option}
						selected={selectedIndex === index}
						search={search}
					/>
				</ComboboxOptionContainer>
			))}
		</ComboboxPanelContainer>
	);
}

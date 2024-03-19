import { ComboboxOptionContainer } from './ComboboxOptionContainer';
import type { ComboboxPanelProps } from '../ComboboxType';
import { ComboboxPanelContainer } from './ComboboxPanelContainer';
import { ComboboxOption } from './ComboboxOption';
import D from '../../../../i18n';

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
	isLoading,
}: ComboboxPanelProps) {
	const visibleOptions = expanded ? options : [];

	const ComboBoxOptionComponent = OptionRender ?? ComboboxOption;

	// Do not display the panel if it's empty
	if (visibleOptions.length === 0 && !search) {
		return null;
	}

	if (isLoading) {
		return (
			<ComboboxPanelContainer
				expanded={expanded}
				focused={focused}
				id={`${id}-list`}
			>
				<div className="lunatic-combo-box-option">
					<span className="label">{D.SUGGESTER_LOADING}</span>
				</div>
			</ComboboxPanelContainer>
		);
	}

	if (search && visibleOptions.length === 0) {
		return (
			<ComboboxPanelContainer
				expanded={expanded}
				focused={focused}
				id={`${id}-list`}
			>
				<div className="lunatic-combo-box-option">
					<span className="label">{D.SUGGESTER_NO_RESULT}</span>
				</div>
			</ComboboxPanelContainer>
		);
	}

	if (visibleOptions.length === 0) {
		return (
			<ComboboxPanelContainer
				expanded={expanded}
				focused={focused}
				id={`${id}-list`}
			>
				<div className="lunatic-combo-box-option">
					<span className="label">{D.SUGGESTER_NO_RESULT}</span>
				</div>
			</ComboboxPanelContainer>
		);
	}

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

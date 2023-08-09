import React, { FunctionComponent } from 'react';
import { PanelContainer } from './panel-container';
import { OptionContainer } from './option-container';
import { ComboBoxOptionType } from '../combo-box.type';
import ComboBoxOption from './combo-box-option';

export type PanelProps = {
	/**
	 * @deprecated use createCustomizableField with ComboboxOptionRenderer as name.
	 */
	optionRenderer?: FunctionComponent<{
		option: ComboBoxOptionType;
		selected?: boolean;
		search?: string;
	}>;
	options: Array<ComboBoxOptionType>;
	focused?: boolean;
	selectedIndex?: number | string | null;
	expanded?: boolean;
	id?: string;
	search?: string;
	onSelect: (value: string) => void;
};

export function Panel({
	optionRenderer: OptionRender,
	options = [],
	focused,
	selectedIndex,
	expanded,
	id,
	search,
	onSelect,
}: PanelProps) {
	const visibleOptions = expanded ? options : [];

	const ComboBoxOptionComponent = OptionRender ?? ComboBoxOption;
	return (
		<PanelContainer expanded={expanded} focused={focused} id={`${id}-list`}>
			{visibleOptions.map((option, index) => (
				<OptionContainer
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
				</OptionContainer>
			))}
		</PanelContainer>
	);
}

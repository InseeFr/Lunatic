import React, { FunctionComponent } from 'react';
import { PanelContainer } from './panel-container';
import { OptionContainer } from './option-container';
import { ComboBoxOption } from '../combo-box.type';

export type PanelProps = {
	optionRenderer: FunctionComponent<{
		option: ComboBoxOption;
		selected?: boolean;
		search?: string;
	}>;
	options: Array<ComboBoxOption>;
	focused?: boolean;
	selectedIndex?: number;
	expanded?: boolean;
	id?: string;
	search?: string;
	onSelect: (index: number) => void;
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

	return (
		<PanelContainer expanded={expanded} focused={focused} id={`${id}-list`}>
			{visibleOptions.map((option, index) => (
				<OptionContainer
					key={option.id ?? option.value}
					index={index}
					selected={selectedIndex === index}
					onSelect={onSelect}
				>
					<OptionRender
						option={option}
						selected={selectedIndex === index}
						search={search}
					/>
				</OptionContainer>
			))}
		</PanelContainer>
	);
}

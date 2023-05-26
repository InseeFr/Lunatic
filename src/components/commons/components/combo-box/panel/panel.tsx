import React, { FunctionComponent } from 'react';
import { PanelContainer } from './panel-container';
import { OptionContainer } from './option-container';
import { ComboBoxOption } from '../combo-box.type';
import { DefaultOptionRenderer } from '../../../index';

export type PanelProps = {
	optionRenderer: FunctionComponent<{
		option: ComboBoxOption;
		selected?: boolean;
		search?: string;
	}>;
	options: Array<ComboBoxOption>;
	focused?: boolean;
	selectedIndex?: number | string | null;
	expanded?: boolean;
	id?: string;
	search?: string;
	onSelect: (value: string) => void;
};

export function Panel({
	optionRenderer: OptionRender = DefaultOptionRenderer,
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
					index={index.toString()}
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

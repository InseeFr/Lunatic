import ComboBox from './combo-box';
import {type Meta, type Story} from '@storybook/react';
import type {ComboBoxOptionType} from './combo-box.type';
import {type ComponentProps, useState} from 'react';
import fieldset from "../fieldset";

const stories = {
    title: 'Components/Commons/ComboBox',
    component: ComboBox,
    argTypes: {onChange: {action: 'onChange'}, onSelect: {action: 'onSelect'}}
} as Meta;

export default stories;

const LabelRenderer = ({
                           option,
                           placeholder,
                       }: {
    option?: ComboBoxOptionType;
    placeholder?: string;
}) => <>{option?.label ?? placeholder}</>;

const Template: Story<ComponentProps<typeof ComboBox>> = (args) => {
    const [localValue, setLocalValue] = useState(args.value)
    const [search, setSearch] = useState<string | null>('')
    // Simulate a search
    const options = search ? args.options.filter(v => v.value.toLowerCase().includes(search.toLowerCase())) : args.options

    return (
        <fieldset>
            <legend>
                Select an option : {localValue}
            </legend>
            <ComboBox
                {...args}
                value={localValue}
                onSelect={(v) => {
                    setLocalValue(v)
                    args.onSelect?.(v)
                }}
                onChange={(v) => {
                    setSearch(v)
                    args.onChange?.(v)
                }}
                options={options}
                labelRenderer={LabelRenderer}
                optionRenderer={LabelRenderer}
            />
            <button onClick={() => setLocalValue('4')}>Sélectionner paris</button>
        </fieldset>
    );
};

export const Default = Template.bind({});
Default.args = {
    value: '1',
    options: [
        {id: '1', value: 'Option 1', label: <strong>Option 1</strong>},
        {id: '2', value: 'Option 2', label: 'Option 2'},
        {id: '3', value: 'Option 3', label: 'Option 3'},
        {id: 'paris', value: 'Paris', label: 'Paris'},
        {id: 'toulouse', value: 'Toulouse', label: 'Toulouse'},
    ],
};

export const Editable = Template.bind({});
Editable.args = {
    ...Default.args,
    editable: true,
};

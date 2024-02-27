import { Sequence } from './Sequence/Sequence';
import { Subsequence } from './Subsequence/Subsequence';
import { RosterForLoop } from './RosterForLoop/RosterForLoop';
import { Table } from './Table/Table';
import { Datepicker } from './Datepicker/Datepicker';
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup';
import { CheckboxBoolean } from './CheckboxBoolean/CheckboxBoolean';
import { Radio } from './Radio/Radio';
import { Input } from './Input/Input';
import { Textarea } from './Textarea/Textarea';
import type { LunaticComponentProps, LunaticComponentType } from './type';
import type { ComponentType } from 'react';
import { Switch } from './Switch/Switch';
import { FilterDescription } from './FilterDescription/FilterDescription';
import { Question } from './Question/Question';
import { ComponentSet } from './ComponentSet/ComponentSet';
import { InputNumber } from './InputNumber/InputNumber';
import { Duration } from './Duration/Duration';
import { Loop } from './Loop/Loop';

// List of all the "componentType"
export const library = {
	Sequence: Sequence,
	Subsequence: Subsequence,
	RosterForLoop: RosterForLoop,
	Loop: Loop,
	Table: Table,
	InputNumber: InputNumber,
	Datepicker: Datepicker,
	CheckboxGroup: CheckboxGroup,
	CheckboxBoolean: CheckboxBoolean,
	Radio: Radio,
	Input: Input,
	Duration: Duration,
	Textarea: Textarea,
	Switch: Switch,
	Question: Question,
	ComponentSet: ComponentSet,
	FilterDescription: FilterDescription,
	// Dropdown: Dropdown,
	// PairwiseLinks: PairwiseLinks,
	// Roundabout: Roundabout,
	// Suggester: Suggester
} satisfies {
	[Property in LunaticComponentType]: ComponentType<
		LunaticComponentProps<Property>
	>;
};

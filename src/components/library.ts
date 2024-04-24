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
import { InputNumber } from './InputNumber/InputNumber';
import { Duration } from './Duration/Duration';
import { Loop } from './Loop/Loop';
import { Dropdown } from './Dropdown/Dropdown';
import { Roundabout } from './Roundabout/Roundabout';
import { PairwiseLinks } from './PairwiseLinks/PairwiseLinks';
import { CheckboxOne } from './CheckboxOne/CheckboxOne';
import { Suggester } from './Suggester/Suggester';
import { Summary } from './Summary/Summary';
import { RemoteComponent } from './RemoteComponent/RemoteComponent';

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
	CheckboxOne: CheckboxOne,
	CheckboxBoolean: CheckboxBoolean,
	Radio: Radio,
	Input: Input,
	Duration: Duration,
	Textarea: Textarea,
	Switch: Switch,
	Question: Question,
	FilterDescription: FilterDescription,
	Dropdown: Dropdown,
	PairwiseLinks: PairwiseLinks,
	Roundabout: Roundabout,
	Suggester: Suggester,
	Summary: Summary,
	RemoteComponent: RemoteComponent,
} satisfies {
	[Property in LunaticComponentType]: ComponentType<
		LunaticComponentProps<Property>
	>;
};

import type { Subsequence } from './Subsequence/Subsequence';
import type { Input } from './Input/Input';
import type {
	Declaration,
	Declarations,
} from './shared/Declarations/Declarations';
import type { Label } from './shared/Label/Label';
import { Tr, Td, Th, Tbody, Thead, Table } from './shared/Table';
import type { Textarea } from './Textarea/Textarea';
import type { RadioGroup } from './shared/Radio/RadioGroup';
import type { CustomRoundabout } from './Roundabout/CustomRoundabout';
import {
	RoundaboutContainer,
	RoundaboutItContainer,
	RoundaboutItTitle,
	RoundaboutLabel,
	RoundaboutPending,
} from './Roundabout/extra';
import type { RoundaboutItButton } from './Roundabout/RoundaboutItButton';
import type { Button } from './shared/Button/Button';
import type { CheckboxBoolean } from './CheckboxBoolean/CheckboxBoolean';
import { CheckboxOne } from './CheckboxOne/CheckboxOne';
import type { CheckboxOption } from './shared/Checkbox/CheckboxOption';
import type { Datepicker } from './Datepicker/Datepicker';
import type { Duration } from './Duration/Duration';
import { Fieldset } from './shared/Fieldset/Fieldset';
import type { InputNumber } from './InputNumber/InputNumber';
import type { Question } from './Question/Question';
import type { RadioOption } from './shared/Radio/RadioOption';
import type { Sequence } from './Sequence/Sequence';
import type { Switch } from './Switch/Switch';
import type { Loop } from './Loop/Loop';
import type { RosterForLoop } from './RosterForLoop/RosterForLoop';

/**
 * Contains the type of every customizable component
 */
export type CustomizedComponent = {
	// Components
	Input: typeof Input;
	InputNumber: typeof InputNumber;
	Sequence: typeof Sequence;
	Switch: typeof Switch;
	Subsequence: typeof Subsequence;
	Textarea: typeof Textarea;
	Datepicker: typeof Datepicker;
	Duration: typeof Duration;
	Question: typeof Question;
	BlockForLoop: typeof Loop;
	RosterForLoop: typeof RosterForLoop;

	// Checkbox
	Radio: typeof RadioGroup;
	CheckboxBoolean: typeof CheckboxBoolean;
	CheckboxOne: typeof CheckboxOne;
	CheckboxOption: typeof CheckboxOption;
	RadioGroup: typeof RadioGroup;
	RadioOption: typeof RadioOption;

	// Dropdown

	// Roundabout
	Roundabout: typeof CustomRoundabout;
	RoundaboutContainer: typeof RoundaboutContainer;
	RoundaboutLabel: typeof RoundaboutLabel;
	RoundaboutItTitle: typeof RoundaboutItTitle;
	RoundaboutItContainer: typeof RoundaboutItContainer;
	RoundaboutItButton: typeof RoundaboutItButton;
	RoundaboutPending: typeof RoundaboutPending;

	// Shared
	Button: typeof Button;
	Label: typeof Label;
	Declarations: typeof Declarations;
	Declaration: typeof Declaration;
	Tr: typeof Tr;
	Td: typeof Td;
	Th: typeof Th;
	Tbody: typeof Tbody;
	Table: typeof Table;
	Thead: typeof Thead;
	Fieldset: typeof Fieldset;
};

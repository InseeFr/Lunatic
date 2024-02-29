import type { Subsequence } from './Subsequence/Subsequence';
import type { CustomInput } from './Input/Input';
import type {
	Declaration,
	Declarations,
} from './shared/Declarations/Declarations';
import type { Label } from './shared/Label/Label';
import type { Table, Tbody, Td, Th, Thead, Tr } from './shared/Table';
import type { CustomTextarea } from './Textarea/Textarea';
import type { RadioGroup } from './shared/Radio/RadioGroup';
import type { CustomRoundabout } from './Roundabout/CustomRoundabout';
import type {
	RoundaboutContainer,
	RoundaboutItContainer,
	RoundaboutItTitle,
	RoundaboutLabel,
	RoundaboutPending,
} from './Roundabout/extra';
import type { RoundaboutItButton } from './Roundabout/RoundaboutItButton';
import type { Button } from './shared/Button/Button';
import type { CustomCheckboxBoolean } from './CheckboxBoolean/CheckboxBoolean';
import type { CheckboxOne } from './CheckboxOne/CheckboxOne';
import type { CheckboxOption } from './shared/Checkbox/CheckboxOption';
import type { CustomDatepicker } from './Datepicker/Datepicker';
import type { CustomDuration } from './Duration/Duration';
import type { Fieldset } from './shared/Fieldset/Fieldset';
import type { CustomInputNumber } from './InputNumber/InputNumber';
import type { CustomQuestion } from './Question/Question';
import type { RadioOption } from './shared/Radio/RadioOption';
import type { Sequence } from './Sequence/Sequence';
import type { CustomSwitch } from './Switch/Switch';
import type { CustomLoop } from './Loop/Loop';
import type { CustomDropdown } from './Dropdown/Dropdown';
import type { Combobox } from './shared/Combobox/Combobox';
import type { ComboboxContainer } from './shared/Combobox/ComboboxContainer';
import type { ComboboxContentBox } from './shared/Combobox/ComboboxContentBox';
import type { ComboboxOption } from './shared/Combobox/Panel/ComboboxOption';
import type { ComboboxPanelContainer } from './shared/Combobox/Panel/ComboboxPanelContainer';
import type { ComboboxClearButton } from './shared/Combobox/Selection/ComboboxClearButton';
import type { ComboboxLabelSelection } from './shared/Combobox/Selection/ComboboxLabelSelection';
import { SuggesterNotification } from './Suggester/SuggesterNotification';
import type { Radio } from './Radio/Radio';
import type { ComboboxInput } from './shared/Combobox/Selection/ComboboxInput';
import type { FilterDescription } from './FilterDescription/FilterDescription';
import type { CustomSuggester } from './Suggester/CustomSuggester';
import type { CustomCheckboxGroup } from './CheckboxGroup/CustomCheckboxGroup';
import type { RouterLink } from './shared/MDLabel/RouterLink';
import type { SummaryResponses, SummaryTitle } from './Summary/Summary';

/**
 * Contains the type of every customizable component
 */
export type LunaticCustomizedComponent = {
	// Components
	Input: typeof CustomInput;
	InputNumber: typeof CustomInputNumber;
	Sequence: typeof Sequence;
	Switch: typeof CustomSwitch;
	Subsequence: typeof Subsequence;
	Textarea: typeof CustomTextarea;
	Datepicker: typeof CustomDatepicker;
	Duration: typeof CustomDuration;
	Question: typeof CustomQuestion;
	Loop: typeof CustomLoop;
	Dropdown: typeof CustomDropdown;
	Radio: typeof Radio;
	Suggester: typeof CustomSuggester;

	// Checkbox
	CheckboxBoolean: typeof CustomCheckboxBoolean;
	CheckboxGroup: typeof CustomCheckboxGroup;
	CheckboxOne: typeof CheckboxOne;
	CheckboxOption: typeof CheckboxOption;
	RadioGroup: typeof RadioGroup;
	RadioOption: typeof RadioOption;

	// ComboBox
	Combobox: typeof Combobox;
	ComboboxContainer: typeof ComboboxContainer; // Top level wrapper
	ComboboxContentBox: typeof ComboboxContentBox; // Wrapper around the field
	ComboboxPanelContainer: typeof ComboboxPanelContainer; // ul element
	ComboboxOption: typeof ComboboxOption; // option (inside the li)
	ComboboxInput: typeof ComboboxInput; // option (inside the li)
	ComboboxClearButton: typeof ComboboxClearButton;
	ComboboxLabelSelection: typeof ComboboxLabelSelection;

	// Roundabout
	Roundabout: typeof CustomRoundabout;
	RoundaboutContainer: typeof RoundaboutContainer;
	RoundaboutLabel: typeof RoundaboutLabel;
	RoundaboutItTitle: typeof RoundaboutItTitle;
	RoundaboutItContainer: typeof RoundaboutItContainer;
	RoundaboutItButton: typeof RoundaboutItButton;
	RoundaboutPending: typeof RoundaboutPending;

	// Suggester
	SuggesterNotification: typeof SuggesterNotification;

	// Summary
	SummaryTitle: typeof SummaryTitle;
	SummaryResponses: typeof SummaryResponses;

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
	Notification: typeof Notification;
	RouterLink: typeof RouterLink;
};

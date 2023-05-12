import { ReactNode } from 'react';

export type ComboBoxOption = {
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
};

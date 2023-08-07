import { ReactNode } from 'react';

export type ComboBoxOptionType = {
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
};

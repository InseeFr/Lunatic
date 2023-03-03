const inputNumberProps = {
	thousandSeparator: { fr: ' ', en: ',' },
	decimalSeparator: { fr: ',', en: '.' },
} as const;

export const allDecimalSeparators = Object.values(
	inputNumberProps.decimalSeparator
);

export default inputNumberProps;
export type InputNumberPropsI18N = typeof inputNumberProps;

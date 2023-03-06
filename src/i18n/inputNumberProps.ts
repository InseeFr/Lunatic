const inputNumberProps = {
	thousandSeparator: { fr: ' ', en: ',' },
	decimalSeparator: { fr: ',', en: '.' },
} as const;

export const allDecimalSeparators = Object.values(
	inputNumberProps.decimalSeparator
);
export type InputNumberPropsI18N = typeof inputNumberProps;
export default inputNumberProps;

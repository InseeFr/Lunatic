const inputNumberProps = {
	thousandSeparator: { fr: ' ', en: ',' },
	decimalSeparator: { fr: ',', en: '.' },
};

export const allDecimalSeparators = Object.values(
	inputNumberProps.decimalSeparator
);

export default inputNumberProps;

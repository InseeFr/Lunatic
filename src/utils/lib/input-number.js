export const isNumberValid = (num, decimals = 0) => {
	// \\ because of escaping, basic regex has only one \
	if (num.includes('.') && !decimals) return false;
	const regex = new RegExp(`^(-)?(0|[1-9]\\d*)(\\.(\\d){0,${decimals}})?$`);
	return regex.test(num);
};

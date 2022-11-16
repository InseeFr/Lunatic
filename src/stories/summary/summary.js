function Summary({ display = true }) {
	if (display) {
		return <div>Summary</div>;
	}
	return <div aria-hidden="true"></div>;
}

export default Summary;

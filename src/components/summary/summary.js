function Summary({ sequences, goToPage }) {
	const li = sequences.map(function (sequence) {
		const { label, page } = sequence;
		return (
			<li className="">
				<a
					href="_"
					onClick={(e) => {
						e.preventDefault();
						goToPage({ page });
					}}
				>
					{label}
				</a>
			</li>
		);
	});
	return <ul className="lunatic-summary">{li}</ul>;
}

export default Summary;

function Summary({ sequences, goToPage }) {
	const li = sequences.map(function (sequence) {
		const { label, page } = sequence;
		return (
			<li>
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
	return <ul>{li}</ul>;
}

export default Summary;

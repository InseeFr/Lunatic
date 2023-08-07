import { PropsWithChildren } from "react";
import { createCustomizableLunaticField } from "../commons";

/*
	This component allows for the subcomponents in PairwiseLinks to be customised
*/
function PairwiseContainer({
	children
}: PropsWithChildren) {

	return (
		<>
			{children}
		</>
	);
}

export default createCustomizableLunaticField(PairwiseContainer, 'PairwiseContainer');

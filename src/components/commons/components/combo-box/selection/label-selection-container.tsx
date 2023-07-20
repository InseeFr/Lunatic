import { PropsWithChildren } from "react";
import classnames from "classnames";
import createCustomizableLunaticField from "../../../create-customizable-field";

type LabelSelectionContainerProps = PropsWithChildren<{
	disabled?: boolean;
}>;


function LabelSelectionContainer({disabled, children}: LabelSelectionContainerProps) {

  return <div
		className={
      classnames('lunatic-combo-box-selected', {
		    disabled,
		  })
    }
	>
    {children}
  </div>
}

export default createCustomizableLunaticField(LabelSelectionContainer, 'LabelSelection');

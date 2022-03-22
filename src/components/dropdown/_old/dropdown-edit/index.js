import React from "react";
import DropdownEdit from "./dropdown-edit";
import childrenToOption from "../commons/children-to-option";

const createDropDown = Component => ({ children, options, ...props }) => {
  const o = options || childrenToOption(children);
  return <Component options={o} {...props} />;
};

export default createDropDown(DropdownEdit);
export { default as Option } from "./option";

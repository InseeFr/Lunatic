import React from "react";
import DropdownEdit from "./dropdown";

const childrenToOption = (children = []) =>
  (Array.isArray(children) ? children : [children]).map(child => {
    const { value } = child.props;
    const label = child.props.children;
    if (label === undefined || value === undefined) {
      throw new Error("Ooops");
    }
    return { label, value };
  });

const createDropDown = Component => ({ children, options, ...props }) => {
  const o = options || childrenToOption(children);
  return <Component options={o} {...props} />;
};

export default createDropDown(DropdownEdit);
export { default as Option } from "./option";

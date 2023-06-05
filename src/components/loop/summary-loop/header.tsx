import { ReactNode } from "react";

type Props = {
	id?: string;
	label?: ReactNode;
};

function Header({ label, id }: Props) {
  if (!label) {
    return null;
  }
  return (
    <h5 id={id}>{label}</h5>
  )
}

export default Header;
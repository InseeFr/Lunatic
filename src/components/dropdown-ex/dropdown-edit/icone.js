import React from "react";
import OpenedIcon from "../commons/components/opened.icon";
import CrossIcon from "./cross.icon";
import ClosedIcon from "../commons/components/closed.icon";

/** */
const getIcon = visible =>
  visible ? (
    <OpenedIcon width={10} height={10} />
  ) : (
    <ClosedIcon width={10} height={10} />
  );

const Icone = ({ prefix, visible, onDelete, onSwitch }) =>
  prefix && prefix.length > 0 ? (
    <span className="lunatic-icone" tabIndex="-1" onMouseDown={onDelete}>
      <CrossIcon width={10} height={10} />
    </span>
  ) : (
    <span className="lunatic-icone" tabIndex="-1" onMouseDown={onSwitch}>
      {getIcon(visible)}
    </span>
  );

export default Icone;

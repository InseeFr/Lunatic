import React from "react";
import classnames from "classnames";
import "./theme.scss";

function OptionNafRenderer({ option, selected }) {
  const { libelle, code, niveau } = option;
  return (
    <div className={classnames("naf-option", { selected })}>
      <span className={classnames("code", niveau)} title={`${niveau} ${code}`}>
        {code}
      </span>
      <span className="libelle">{libelle}</span>
    </div>
  );
}

export default OptionNafRenderer;

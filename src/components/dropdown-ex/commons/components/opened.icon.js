import React from "react";

function Icon({ height = 20, width = 20, color = "#aaa" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0"
      y="0"
      enableBackground="new 0 0 292.362 292.362"
      version="1.1"
      viewBox="0 0 292.362 292.362"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M286.935 197.286L159.028 69.379c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.286C1.807 200.9 0 205.184 0 210.132s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.428 12.85 5.428h255.813c4.949 0 9.233-1.811 12.848-5.428 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.232-5.427-12.846z"
      ></path>
    </svg>
  );
}

export default Icon;

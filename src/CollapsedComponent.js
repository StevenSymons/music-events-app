import React from "react";

const CollapsedComponent = props => {
  return (
    <tr>
      <td colSpan={4}>{props.children}</td>
    </tr>
  );
};

export default CollapsedComponent;

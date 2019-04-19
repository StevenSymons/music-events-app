import React from "react";
import { Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

/*
This is what allows me to "expand" a table row. 
This has been separated into a component to prevent a standard 'div' 
from wrapping the component instead of a tr. A div would break the collapsed element, 
because divs are not allowed in a table.
*/

const styles = {
  td: {
    padding: 0
  }
};

const CollapsedComponentRow = props => {
  const { classes } = props;
  return (
    <tr>
      <Fade in={true}>
        <td className={classes.td} colSpan={4}>
          {props.children}
        </td>
      </Fade>
    </tr>
  );
};

export default withStyles(styles)(CollapsedComponentRow);

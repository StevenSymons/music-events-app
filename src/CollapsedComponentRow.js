import React from "react";
import { Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// What is this useless thing? It's the only thing that allows me to "expand" a table row

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

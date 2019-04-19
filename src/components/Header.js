import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  appBar: {
    backgroundColor: "#34515e",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    height: 80
  }
};

const Header = props => {
  const { classes } = props;
  return (
    <AppBar
      position="static"
      className={classes.AppBar}
      classes={{ colorPrimary: classes.appBar }}
    >
      <Toolbar>
        <Typography variant="h4" color="inherit">
          Music Events Belgium
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);

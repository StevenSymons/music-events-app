import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default props => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h4" color="inherit">
        Event List
      </Typography>
    </Toolbar>
  </AppBar>
);

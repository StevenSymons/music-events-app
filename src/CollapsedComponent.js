import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

const CollapsedComponent = props => {
  return (
    <tr>
      <td colSpan={4}>
        <Card>
          <div>
            <CardContent>
              <Typography component="h5" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            style={{ height: 225, width: 305 }}
            image={
              "https://s1.ticketm.net/dam/a/6e6/36cc1651-d377-4362-812b-e6865ea106e6_942821_CUSTOM.jpg"
            }
            title="Live from space album cover"
          />
        </Card>
      </td>
    </tr>
  );
};

export default CollapsedComponent;

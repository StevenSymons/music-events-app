import React from "react";
import CollapsedComponentRow from "./CollapsedComponentRow";
import { withStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const styles = theme => ({
  label: {
    color: "#ffffff"
  },
  card: {
    borderRadius: 0,
    backgroundColor: "#8eacbb",
    display: "flex",
    alignItems: "center",
    height: 250
  },
  cardMedia: {
    height: 225,
    width: 305,
    marginLeft: 30,
    [theme.breakpoints.down("xs")]: {
      width: 0
    }
  },
  table: {
    height: 225,
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  tableCell: {
    backgroundColor: "white"
  }
});

const CollapsedComponent = ({
  id,
  imageUrl,
  name,
  date,
  priceRanges,
  venue,
  url,
  classes
}) => {
  return (
    <Collapse
      in={id}
      timeout={{ enter: 0, exit: 0 }}
      component={CollapsedComponentRow}
      unmountOnExit
    >
      <Card classes={{ root: classes.card }}>
        <CardMedia className={classes.cardMedia} image={imageUrl} />
        <CardContent style={{ padding: 0 }}>
          <Table classes={{ root: classes.table }}>
            <TableBody>
              <TableRow borderbottom={0} classes={{ root: classes.tableRow }}>
                <TableCell classes={{ root: classes.tableCell }}>
                  Event:
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  {name}
                </TableCell>
              </TableRow>
              <TableRow classes={{ root: classes.tableRow }}>
                <TableCell classes={{ root: classes.tableCell }}>
                  Date:
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  {date}
                </TableCell>
              </TableRow>
              <TableRow classes={{ root: classes.tableRow }}>
                <TableCell classes={{ root: classes.tableCell }}>
                  Price:
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  {priceRanges
                    ? "EUR " + priceRanges[0].max
                    : "No price available yet."}
                </TableCell>
              </TableRow>
              <TableRow classes={{ root: classes.tableRow }}>
                <TableCell classes={{ root: classes.tableCell }}>
                  Location:
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  {venue}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default withStyles(styles)(CollapsedComponent);

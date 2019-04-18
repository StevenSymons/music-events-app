import React from "react";
import CollapsedComponentRow from "./CollapsedComponentRow";
import { withStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Card,
  CardContent,
  CardMedia,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const styles = {
  button: {
    backgroundColor: "#3d5afe",
    "&:hover": {
      backgroundColor: "#0031ca"
    },
    marginLeft: 25
  },
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
    borderRadius: 2
  },
  tableRow: {
    borderColor: "green"
  },
  tableCell: {
    paddingRight: 10,
    backgroundColor: "white"
  },
  cardContent: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

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
          <Table style={{ height: 225, width: 400 }}>
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

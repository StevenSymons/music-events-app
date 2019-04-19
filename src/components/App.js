import React, { Component, Fragment } from "react";
import Header from "./Header";
import Pagination from "./Pagination";
import CollapsedComponent from "./CollapsedComponent";
import { withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress
} from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    width: 960,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    height: "100%"
  },
  tableHeadRow: {
    backgroundColor: "#607d8b"
  },
  tableCell: {
    color: "#ffffff"
  },
  tableRow: {
    cursor: "pointer"
  },
  columns: {
    event: {
      width: "34%"
    },
    genre: {
      width: "20%"
    },
    date: {
      width: "20%"
    },
    location: {
      width: "20%"
    }
  }
});

class App extends Component {
  state = {
    events: [],
    event: "",
    isLoading: true,
    page: 0,
    rowsPerPage: 10
  };

  handleClick = (event, id) => {
    this.setState({ event, [id]: !this.state[id] });
  };

  onChangePage = (e, page) => {
    this.setState({ page });
  };

  onChangeRowsPerPage = e => {
    e.persist();
    const rowsPerPage = parseInt(e.target.value);
    this.setState({ rowsPerPage });
  };

  componentDidMount() {
    const { rowsPerPage, page } = this.state;
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=HDm4kf9OkZvd3cMbYB5cOjGUsoPGR4fU&size=${rowsPerPage}&page=${page}&countryCode=BE`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          events: data._embedded.events,
          pageCount: data.page.totalElements,
          isLoading: false
        });
      })
      .catch(e => console.log(e));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.rowsPerPage !== this.state.rowsPerPage ||
      prevState.page !== this.state.page
    ) {
      const { page, rowsPerPage } = this.state;
      const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=HDm4kf9OkZvd3cMbYB5cOjGUsoPGR4fU&size=${rowsPerPage}&page=${page}&countryCode=BE`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({
            events: data._embedded.events
          });
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    const { events, isLoading, page, rowsPerPage, pageCount } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Header />
            <Table className={classes.table}>
              <colgroup>
                <col className={classes.columns.event} />
                <col className={classes.columns.genre} />
                <col className={classes.columns.date} />
                <col className={classes.columns.location} />
              </colgroup>
              <TableHead>
                <TableRow classes={{ head: classes.tableHeadRow }}>
                  <TableCell
                    classes={{ head: classes.tableCell }}
                    variant="head"
                  >
                    Event
                  </TableCell>
                  <TableCell
                    classes={{ head: classes.tableCell }}
                    variant="head"
                  >
                    Genre
                  </TableCell>
                  <TableCell
                    classes={{ head: classes.tableCell }}
                    variant="head"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    classes={{ head: classes.tableCell }}
                    variant="head"
                  >
                    Location
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell>
                      <CircularProgress color="primary" />
                    </TableCell>
                    <TableCell>
                      <CircularProgress color="primary" />
                    </TableCell>
                    <TableCell>
                      <CircularProgress color="primary" />
                    </TableCell>
                    <TableCell>
                      <CircularProgress color="primary" />
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map(event => {
                    console.log(event);
                    const { id, name, priceRanges, url } = event,
                      genre = event.classifications[0].genre.name,
                      date = event.dates.start.localDate,
                      venue = event._embedded.venues[0].name,
                      imageUrl = event.images[0].url;
                    return (
                      <Fragment key={id}>
                        <TableRow
                          hover={true}
                          selected={this.state[id]}
                          className={classes.tableRow}
                          classes={{
                            hover: classes.tableRow,
                            selected: classes.tableRow
                          }}
                          onClick={() => this.handleClick(event, id)}
                        >
                          <TableCell>{name}</TableCell>
                          <TableCell>{genre}</TableCell>
                          <TableCell>{date}</TableCell>
                          <TableCell>{venue}</TableCell>
                        </TableRow>
                        <CollapsedComponent
                          id={this.state[id]}
                          imageUrl={imageUrl}
                          name={name}
                          date={date}
                          priceRanges={priceRanges}
                          venue={venue}
                          url={url}
                        />
                      </Fragment>
                    );
                  })
                )}
              </TableBody>
              <Pagination
                page={page}
                rowsPerPage={rowsPerPage}
                pageCount={pageCount}
                isLoading={isLoading}
                onChangePage={this.onChangePage}
                onChangeRowsPerPage={this.onChangeRowsPerPage}
              />
            </Table>
          </Paper>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);

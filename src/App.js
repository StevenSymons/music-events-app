import React, { Component, Fragment } from "react";
import Header from "./layouts/header";
import CollapsedComponent from "./CollapsedComponent";
import Pagination from "./Pagination";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse
} from "@material-ui/core";

const styles = {
  Root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Paper: {
    width: 700,
    height: "100%"
  },
  TableRow: {
    cursor: "pointer"
  },
  CollapsedComponent: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 35,
    paddingRight: 35,
    height: 200
  }
};

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
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=HDm4kf9OkZvd3cMbYB5cOjGUsoPGR4fU&size=${
      this.state.rowsPerPage
    }&page=${this.state.page}&countryCode=BE`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ events: data._embedded.events, page });
      })
      .catch(e => console.log(e));
  };

  onChangeRowsPerPage = e => {
    e.persist();
    const rowsPerPage = parseInt(e.target.value);
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=HDm4kf9OkZvd3cMbYB5cOjGUsoPGR4fU&size=${rowsPerPage}&page=${
      this.state.page
    }&countryCode=BE`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data._embedded.events,
          pageCount: data.page.totalElements,
          rowsPerPage
        });
      })
      .catch(e => console.log(e));
  };

  componentDidMount() {
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=HDm4kf9OkZvd3cMbYB5cOjGUsoPGR4fU&size=${
      this.state.rowsPerPage
    }&page=${this.state.page}&countryCode=BE`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          events: data._embedded.events,
          pageCount: data.page.totalElements,
          isLoading: false
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { events, isLoading, page, rowsPerPage, pageCount } = this.state;
    return (
      <div style={styles.Root}>
        <Paper style={styles.Paper}>
          <Header />
          <Table style={styles.Table}>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>Loading...</TableCell>
                  <TableCell>Loading...</TableCell>
                  <TableCell>Loading...</TableCell>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              ) : (
                events.map(event => {
                  const {
                    id,
                    name,
                    classifications,
                    dates,
                    priceRanges
                  } = event;
                  return (
                    <Fragment key={id}>
                      <TableRow
                        hover={true}
                        style={styles.TableRow}
                        onClick={() => this.handleClick(event, id)}
                      >
                        <TableCell>{name}</TableCell>
                        <TableCell>{classifications[0].genre.name}</TableCell>
                        <TableCell>{dates.start.localDate}</TableCell>
                        <TableCell>
                          EUR
                          {priceRanges
                            ? priceRanges[0].max
                            : "Price unavailable"}
                        </TableCell>
                      </TableRow>
                      <Collapse
                        in={this.state[id]}
                        timeout={{ enter: 0, exit: 0 }}
                        component={CollapsedComponent}
                        unmountOnExit
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
    );
  }
}

export default App;

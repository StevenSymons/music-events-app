import React, { Component, Fragment } from "react";
import Header from "./layouts/header";
import CollapsedComponent from "./CollapsedComponent";
import Pagination from "./Pagination";
import {
  CssBaseline,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Button
} from "@material-ui/core";

const styles = {
  Root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Paper: {
    width: 960,
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
    this.setState({ page });
  };

  onChangeRowsPerPage = e => {
    e.persist();
    const rowsPerPage = parseInt(e.target.value);
    this.setState({ rowsPerPage });
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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.rowsPerPage !== this.state.rowsPerPage ||
      prevState.page !== this.state.page
    ) {
      const { page, rowsPerPage } = this.state;
      const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=HDm4kf9OkZvd3cMbYB5cOjGUsoPGR4fU&size=${rowsPerPage}&page=${page}&countryCode=BE`;
      fetch(url)
        .then(response => response.json())
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
    return (
      <Fragment>
        <CssBaseline />
        <div style={styles.Root}>
          <Paper style={styles.Paper}>
            <Header />
            <Table>
              <colgroup>
                <col style={{ width: "34%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "22%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell>Event</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Location</TableCell>
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
                            {event._embedded.venues[0].name}
                          </TableCell>
                        </TableRow>
                        <Collapse
                          in={this.state[id]}
                          timeout={{ enter: 0, exit: 0 }}
                          component={CollapsedComponent}
                          unmountOnExit
                        >
                          <Card>
                            <div>
                              <CardContent
                                style={{
                                  display: "flex",
                                  flexDirection: "row"
                                }}
                              >
                                <div>
                                  <CardMedia
                                    style={{ height: 225, width: 305 }}
                                    image={event.images[0].url}
                                  />
                                </div>
                                <div>
                                  <Typography>{name}</Typography>
                                  <Typography>
                                    {dates.start.localDate}
                                  </Typography>
                                  <Typography>
                                    Price:{" "}
                                    {priceRanges
                                      ? priceRanges[0].max
                                      : "No price available yet."}
                                  </Typography>
                                  <Typography>
                                    Location: {event._embedded.venues[0].name}
                                  </Typography>
                                  <Button
                                    href="http://www.google.com"
                                    variant="contained"
                                    color="primary"
                                  >
                                    Check it out!
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        </Collapse>
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

export default App;

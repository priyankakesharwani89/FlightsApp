import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from "../../actions/index";
import FlightCard from "./FlightCard/FlightCard";
import { Flight } from "../../models/Flight";
import {useRouteMatch} from "react-router-dom";
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const mapsStateToProps = (state) => {
  return {
    remoteFlights: state.flights && state.flights.remoteFlights || [],
    filters: state.filters || { year: '', launchSuccess: undefined, landSuccess: undefined},
  };
};

const ConnectedList = ({ remoteFlights, getData, filters }) => {
  const location = useLocation();
  useEffect(() => {
    if (window.__ROUTE_DATA__) {
      this.setState({
        data: window.__ROUTE_DATA__,
      });
      delete window.__ROUTE_DATA__;
    } else {
      const query = new URLSearchParams(location.search);
      
      const year = query.get('launch_year');
      const launchSuccess = query.get('launch_success');
      const landSuccess= query.get('land_success');
      if(year || landSuccess || launchSuccess) {
        getData(`https://api.spacexdata.com/v3/launches?limit=100?launch_success=${launchSuccess}&land_success=${landSuccess}&launch_year=${year}`);
      } else {
        getData(`https://api.spacexdata.com/v3/launches?limit=100`);
      }
     
    }
  }, [filters]);

  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container xs={12} justify="space-around">
        {remoteFlights &&
          remoteFlights.length > 0 &&
          remoteFlights.map((el) => (
            <Grid item xs={6} md={4}>
              <FlightCard className={classes.paper} flightItem={Flight(el)} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

const Flights = connect(mapsStateToProps, { getData })(ConnectedList);

export default Flights;

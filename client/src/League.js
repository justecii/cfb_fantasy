import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
} from "@material-ui/core";

import Standings from "./components/Standings";
import LeagueList from "./components/LeagueList";
import LeagueTable from "./components/LeagueTable";
import AddLeague from "./components/AddLeague";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function League(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Standings" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
          <Tab label="Add League" {...a11yProps(2)} />
          <Tab label="Add League" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <h2>Standings:</h2>
        <h3>{props.user.name}</h3>
        <LeagueTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Transations</h2>
        <p>Coming Soon</p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddLeague user={props.user} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LeagueList />
      </TabPanel>
    </div>
  );
}

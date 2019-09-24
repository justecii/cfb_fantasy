import React, { Component } from "react";
import clsx from "clsx";
import axios from "axios";
import { makeStyles, Button, TextField, Icon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  numberField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },
  longWidth: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "43%"
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

export default function AddLeague(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    rosterSize: 16,
    teamNumber: 10,
    qbs: 1,
    rbs: 2,
    wrs: 2,
    tes: 1,
    idp: 1,
    kickers: 1,
    teamDef: 1
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const starterSize =
    parseInt(values.qbs) +
    parseInt(values.rbs) +
    parseInt(values.wrs) +
    parseInt(values.tes) +
    parseInt(values.idp) +
    parseInt(values.kickers) +
    parseInt(values.teamDef);
  const benchSize = parseInt(values.rosterSize) - starterSize;

  const handleSubmit = event => {
    let userId = props.user.id;
    // TO DO: real validation
    if (values.name || benchSize >= 0) {
      axios.post("/league/new", {
        userId: userId,
        values: values,
        benchSize: benchSize
      });
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        required
        id="standard-name"
        label="League Name"
        className={classes.longWidth}
        value={values.name}
        onChange={handleChange("name")}
        margin="normal"
      />
      <TextField
        id="standard-read-only-input"
        label="Commisioner"
        defaultValue={props.user.name}
        className={classes.longWidth}
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        id="standard-number"
        label="No. of Teams"
        value={values.teamNumber}
        onChange={handleChange("teamNumber")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-qbs"
        label="Starting QB"
        value={values.qbs}
        onChange={handleChange("qbs")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-rbs"
        label="Starting RB"
        value={values.rbs}
        onChange={handleChange("rbs")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-wrs"
        label="Starting WR"
        value={values.wrs}
        onChange={handleChange("wrs")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-tes"
        label="Starting TE"
        value={values.tes}
        onChange={handleChange("tes")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-idp"
        label="Starting IDP"
        value={values.idp}
        onChange={handleChange("idp")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-k"
        label="Starting K"
        value={values.kickers}
        onChange={handleChange("kickers")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        id="standard-def"
        label="Starting DEF"
        value={values.teamDef}
        onChange={handleChange("teamDef")}
        type="number"
        className={classes.numberField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        disabled
        id="standard-disabled"
        label="Bench Size"
        value={benchSize}
        className={classes.numberField}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </form>
  );
}

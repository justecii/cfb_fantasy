import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, wins, percent, ptsFor, ptsAgnst) {
  return { name, wins, percent, ptsFor, ptsAgnst };
}

const rows = [
  createData("MyTeam", "6-0", "1.000", 700, 600),
  createData("Your Team", "4-2", "667", 650, 600),
  createData("Nick's Team", "3-3", ".500", 600, 600),
  createData("12th Fans", "1-5", ".167", 600, 650),
  createData("WSU Fans", "1-5", ".167", 600, 700)
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Team"
  },
  { id: "wins", numeric: true, disablePadding: false, label: "Record" },
  { id: "percent", numeric: true, disablePadding: true, label: "Win %" },
  { id: "ptsFor", numeric: true, disablePadding: true, label: "Pts For" },
  {
    id: "ptsAgainst",
    numeric: true,
    disablePadding: false,
    label: "Pts Against"
  }
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class Standings extends Component {
  render() {
    return (
      <Paper className={useStyles.root}>
        <h2>Standings: </h2>
        <Table className={useStyles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Record</TableCell>
              <TableCell align="right">Win %</TableCell>
              <TableCell align="right">Pts For</TableCell>
              <TableCell align="right">Pts Agnst</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.wins}</TableCell>
                <TableCell align="right">{row.percent}</TableCell>
                <TableCell align="right">{row.ptsFor}</TableCell>
                <TableCell align="right">{row.ptsAgnst}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Standings;

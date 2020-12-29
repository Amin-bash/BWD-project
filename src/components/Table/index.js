import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './styles.scss';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const OrderTable = (props) => {
  const classes = useStyles();
  // key={md5(JSON.stringify(row))}
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Close PPU</TableCell>
            <TableCell align="right">Converted sell limit</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">Open PPU</TableCell>
            <TableCell align="right">Side</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow>
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="right">{row.close_ppu}</TableCell>
              <TableCell align="right">{row.converted_sell_limit_at}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">{row.open_ppu}</TableCell>
              <TableCell align="right">{row.side}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
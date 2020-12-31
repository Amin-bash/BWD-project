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

  const rowColor = isPublished => {
    if (isPublished === "1") {
      return '#CCF8EB';
    }
    return '#F4F7F7';
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nr</TableCell>
            <TableCell align="right">Create Date</TableCell>
            <TableCell align="right">Side</TableCell>
            <TableCell align="right">Exec Type</TableCell>
            <TableCell align="right">Open Price</TableCell>
            <TableCell align="right">Close Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Convert Sell Date</TableCell>
            <TableCell align="right">Closed Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trades.map((row, i) => (
            <TableRow style={{ 'backgroundColor': rowColor(row.is_published) }}>
              <TableCell align="right">{i + 1}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">{row.side}</TableCell>
              <TableCell align="right">{row.open_type} / {row.close_type}</TableCell>
              <TableCell align="right">{parseFloat(row.open_ppu).toFixed(props.pricePrecision)}</TableCell>
              <TableCell align="right">{parseFloat(row.close_ppu).toFixed(props.pricePrecision)}</TableCell>
              <TableCell align="right">{parseFloat(row.qty).toFixed(props.qtyPrecision)}</TableCell>
              <TableCell align="right">{(row.qty * row.open_ppu).toFixed(2)}</TableCell>
              <TableCell align="right">{row.converted_sell_limit_at}</TableCell>
              <TableCell align="right">{row.closed_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
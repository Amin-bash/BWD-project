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
		minWidth: 650
	}
});

const OrderTable = (props) => {
	const classes = useStyles();

	const rowColor = (isPublished) => {
		return isPublished === '1' ? '#CCF8EB' : '#F4F7F7';
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell align="right">Nr</TableCell>
						<TableCell onClick={() => props.handleSort('created_at')} align="right">
							Create Date
						</TableCell>
						{props.showSide && (
							<TableCell onClick={() => props.handleSort('side')} align="right">
								Side
							</TableCell>
						)}
						<TableCell onClick={() => props.handleSort('open_type')} align="right">
							Exec Type
						</TableCell>
						<TableCell onClick={() => props.handleSort('open_price')} align="right">
							Open Price
						</TableCell>
						<TableCell onClick={() => props.handleSort('close_price')} align="right">
							Close Price
						</TableCell>
						<TableCell onClick={() => props.handleSort('qty')} align="right">
							Quantity
						</TableCell>
						<TableCell onClick={() => props.handleSort('qty')} align="right">
							Amount
						</TableCell>
						<TableCell onClick={() => props.handleSort('converted_sell_limit_at')} align="right">
							Convert Sell Date
						</TableCell>
						{props.showClosedAt && (
							<TableCell onClick={() => props.handleSort('closed_at')} align="right">
								Closed Date
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.trades.map((row, i) => (
						<TableRow style={{ backgroundColor: rowColor(row.is_published) }}>
							<TableCell align="right">{i + 1}</TableCell>
							<TableCell align="right">
								<p>{row.created_at}</p>
								<p>{row.created_time}</p>
							</TableCell>
							{props.showSide && <TableCell align="right">{row.side}</TableCell>}
							<TableCell align="right">
								{row.open_type} / {row.close_type}
							</TableCell>
							<TableCell align="right">
								{parseFloat(row.open_price).toFixed(props.pricePrecision)}
							</TableCell>
							<TableCell align="right">
								{parseFloat(row.close_price).toFixed(props.pricePrecision)}
							</TableCell>
							<TableCell align="right">{parseFloat(row.qty).toFixed(props.qtyPrecision)}</TableCell>
							<TableCell align="right">{(row.qty * row.open_price).toFixed(2)}</TableCell>
							<TableCell align="right">
								<p>{row.converted_sell_limit_at}</p>
								<p>{row.converted_time}</p>
							</TableCell>
							{props.showClosedAt && (
								<TableCell align="right">
									<p>{row.closed_at}</p>
									<p>{row.closed_time}</p>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OrderTable;

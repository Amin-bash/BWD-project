import React, { useEffect, useState } from 'react';
import './App.scss';
import OrderTable from './components/Table';
import orderBy from 'lodash/orderBy';

function App() {
	const [ state, setState ] = useState({
		activeTrades: {
			trades: [],
			pricePrecision: '',
			qtyPrecision: '',
			showClosedAt: false,
			showSide: true
		},
		closedTrades: {
			trades: [],
			pricePrecision: '',
			qtyPrecision: '',
			showClosedAt: true,
			showSide: false
		},
		columnToSort: '',
		sortDirection: 'desc'
	});

	const activeTradesEndpoint = 'http://51.15.242.149:8585/orders?status=active';
	const closedTradesEndpoint = 'http://51.15.242.149:8585/orders?status=closed';
	useEffect(() => {
		// active trades
		fetch(activeTradesEndpoint).then((res) => res.json()).then(
			(result) => {
				setState((prevState) => {
					prevState.activeTrades.trades = result.orders.reduce((acc, order) => {
						const created_params = order.created_at.split(' ');
						const converted_params = order.converted_sell_limit_at.split(' ');
						acc.push({
							...order,
							created_at: created_params[0],
							created_time: created_params[1],
							converted_sell_limit_at: converted_params[0],
							converted_time: converted_params[1]
						});
						return acc;
					}, []);
					prevState.activeTrades.pricePrecision = result.price_precision;
					prevState.activeTrades.qtyPrecision = result.qty_precision;
					return { ...prevState };
				});
			},
			(error) => {
				console.log(error);
			}
		);

		// closed trades
		fetch(closedTradesEndpoint).then((res) => res.json()).then(
			(result) => {
				console.log(result);
				setState((prevState) => {
					prevState.closedTrades.trades = result.orders.reduce((acc, order) => {
						const created_params = order.created_at.split(' ');
						const converted_params = order.converted_sell_limit_at.split(' ');
						const closed_params = order.closed_at.split(' ');
						acc.push({
							...order,
							created_at: created_params[0],
							created_time: created_params[1],
							converted_sell_limit_at: converted_params[0],
							converted_time: converted_params[1],
							closed_at: closed_params[0],
							closed_time: closed_params[1]
						});
						return acc;
					}, []);
					prevState.closedTrades.pricePrecision = result.price_precision;
					prevState.closedTrades.qtyPrecision = result.qty_precision;
					return { ...prevState };
				});
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	const invertDirection = {
		asc: 'desc',
		desc: 'asc'
	};

	const handleSort = (columnName) => {
		setState((prevState) => {
			const newState = { ...prevState };
			newState.columnToSort = columnName;
			newState.sortDirection = invertDirection[newState.sortDirection];
			return { ...newState };
		});
	};

	return (
		<div className="App">
			<h1>BWD project</h1>
			<div>
				<h3>Active Trades</h3>
				<OrderTable
					handleSort={handleSort}
					showClosedAt={state.activeTrades.showClosedAt}
					showSide={state.activeTrades.showSide}
					trades={orderBy(state.activeTrades.trades, [ state.columnToSort ], [ state.sortDirection ])}
					pricePrecision={state.activeTrades.pricePrecision}
					qtyPrecision={state.activeTrades.qtyPrecision}
				/>
			</div>
			<div>
				<h3>Closed Trades</h3>
				<OrderTable
					handleSort={handleSort}
					showClosedAt={state.closedTrades.showClosedAt}
					showSide={state.closedTrades.showSide}
					trades={orderBy(state.closedTrades.trades, [ state.columnToSort ], [ state.sortDirection ])}
					pricePrecision={state.closedTrades.pricePrecision}
					qtyPrecision={state.closedTrades.qtyPrecision}
				/>
			</div>
		</div>
	);
}

export default App;

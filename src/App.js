import React, { useEffect, useState } from 'react';
import './App.scss';
import OrderTable from './components/Table';


function App() {
	const [ state, setState ] = useState({
		activeTrades: {
			trades: [],
			pricePrecision: "",
			qtyPrecision: "",
		},
		closedTrades: {
			trades: [],
			pricePrecision: "",
			qtyPrecision: "",
		},
	});

	const activeTradesEndpoint = 'http://51.15.242.149:8585/orders?status=active';
	const closedTradesEndpoint = 'http://51.15.242.149:8585/orders?status=closed';
	useEffect(() => {
		// active trades
		fetch(activeTradesEndpoint).then((res) => res.json()).then(
			(result) => {
				setState((prevState) => {
					prevState.activeTrades.trades = result.orders;
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
				setState((prevState) => {
					prevState.closedTrades.trades = result.orders;
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
	return (
		<div className="App">
			<h1>BWD project</h1>
			<div>
				<h3>Active Trades</h3>
			    <OrderTable
					trades={state.activeTrades.trades}
					pricePrecision={state.activeTrades.pricePrecision}
					qtyPrecision={state.activeTrades.qtyPrecision}
				/>
			</div>
			<div>
				<h3>Closed Trades</h3>
				<OrderTable
					trades={state.closedTrades.trades}
					pricePrecision={state.closedTrades.pricePrecision}
					qtyPrecision={state.closedTrades.qtyPrecision}
				/>
			</div>
		</div>
	);
}

export default App;

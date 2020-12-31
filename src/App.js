import React, { useEffect, useState } from 'react';
import './App.scss';
import OrderTable from './components/Table';


function App() {
	const [ state, setState ] = useState({
		trades: [],
		pricePrecision: "",
		qtyPrecision: "",
	});

	const APIOrders = 'http://51.15.242.149:8585/orders?status=active';
	useEffect(() => {
		// get orders
		fetch(APIOrders).then((res) => res.json()).then(
			(result) => {
				setState((prevState) => {
					prevState.trades = result.orders;
					prevState.pricePrecision = result.price_precision;
					prevState.qtyPrecision = result.qty_precision;
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
					trades={state.trades}
					pricePrecision={state.pricePrecision}
					qtyPrecision={state.qtyPrecision}
				/>
			</div>
		</div>
	);
}

export default App;

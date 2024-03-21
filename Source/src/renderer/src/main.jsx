import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

// import of pages
import Welcome from './newPages/Welcome.jsx';
import Home from './newPages/Home.jsx';
import Settings from './newPages/Settings.jsx';
import Ticket from './newPages/Ticket.jsx';
import PrimulaFunction from './newPages/PrimulaFunction.jsx';
import TicketResult from './newPages/TicketResult.jsx';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={<Welcome />}
				/>
				<Route
					path="/home"
					element={<Home />}
				/>
				<Route
					path="/ticket"
					element={<Ticket />}
				/>
				<Route
					path="/ticketresult"
					element={<TicketResult />}
				/>
				<Route
					path="/primulafunction"
					element={<PrimulaFunction />}
				/>
				<Route
					path="/settings"
					element={<Settings />}
				/>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);

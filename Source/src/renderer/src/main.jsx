import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome.jsx';
import Home from './pages/Home.jsx';
import Automatic from './pages/Automatic.jsx';
import Primulafunction from './pages/Primulafunction.jsx';
import Settings from './pages/Settings.jsx';
import Results from './pages/Results.jsx';

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
					path="/automatic"
					element={<Automatic />}
				/>
				<Route
					path="/primulafunction"
					element={<Primulafunction />}
				/>
				<Route
					path="/settings"
					element={<Settings />}
				/>
				<Route
					path="/results"
					element={<Results />}
				/>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);

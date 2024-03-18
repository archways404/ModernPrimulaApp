import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

// PRODUCTION:
//import Welcome from './pages/Welcome.jsx';
//import Home from './pages/Home.jsx';
import Automatic from './pages/Automatic.jsx';
import Primulafunction from './pages/Primulafunction.jsx';
import Results from './pages/Results.jsx';

// DEVELOPMENT:
import Welcome from './newPages/Welcome.jsx';
import Home from './newPages/Home.jsx';
import Settings from './newPages/Settings.jsx';
/*
import Home from './newPages/Home.jsx';
import Automatic from './newPages/Automatic.jsx';
import Primulafunction from './newPages/Primulafunction.jsx';
import Settings from './newPages/Settings.jsx';
import Results from './newPages/Results.jsx';
*/

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

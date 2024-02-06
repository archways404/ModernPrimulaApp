import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

// PRODUCTION IMPORTS
import Welcome from './pages/Welcome.jsx'
import Home from './pages/Home.jsx'
import Automatic from './pages/Automatic.jsx'
import Primulafunction from './pages/Primulafunction.jsx'
import Settings from './pages/Settings.jsx'

/*
// TEST IMPORTS
import Welcome from './testpages/Welcome.jsx';
import Home from './testpages/Home.jsx';
import Automatic from './testpages/Automatic.jsx';
import Primulafunction from './testpages/Primulafunction.jsx';
import Settings from './testpages/Settings.jsx';
*/

import './index.css'

//PRODUCTION
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/automatic" element={<Automatic />} />
        <Route path="/primulafunction" element={<Primulafunction />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)

/*
//DEVELOPMENT
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
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
*/

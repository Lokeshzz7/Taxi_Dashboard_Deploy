import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from "./signin";
import Main from './Main.jsx';
import Driver from './Driver.jsx';
import Car from './Car.jsx';
import AddTrip from './AddTrip.jsx';
import Invoice from './invoice.jsx';
import AddDrivers from './AddDrivers.jsx';
import AddCar from './AddCar.jsx';
import AddExpense from './AddExpense.jsx';
import Trips from './Trips.jsx';

import TripsList from './components/TripsList.jsx';
import DriverDetails from './components/DriverDetails.jsx';
import CarDetails from './components/Cardetails.jsx';
import Redirect from './Redirect.jsx';  // Import Redirect component
import ProtectedRoute from './ProtectedRoute.jsx';  // Import ProtectedRoute component
import EndTrip from './EndTrip.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/redirect" element={<Redirect />} />
        
        {/* Admin Routes */}
        <Route path="/main" element={<ProtectedRoute element={<Main />} allowedRoles={['admin']} />} />
        <Route path="/driver" element={<ProtectedRoute element={<Driver />} allowedRoles={['admin']} />} />
        <Route path="/car" element={<ProtectedRoute element={<Car />} allowedRoles={['admin']} />} />
        
        {/* Updated Route for Adding Trips */}
        <Route path="/addtrip" element={<ProtectedRoute element={<AddTrip />} allowedRoles={['admin']} />} />

        <Route path="/endtrip/:tripId" element={<ProtectedRoute element={<EndTrip />} allowedRoles={['admin','driver']} />} />
        
        {/* New Route for Editing Trips */}
        <Route path="/edittrip/:tripId" element={<ProtectedRoute element={<AddTrip />} allowedRoles={['driver', 'admin']} />} />
        
        <Route path="/invoice" element={<ProtectedRoute element={<Invoice />} allowedRoles={['admin']} />} />
        <Route path="/adddriver" element={<ProtectedRoute element={<AddDrivers />} allowedRoles={['admin']} />} />
        <Route path="/addcar" element={<ProtectedRoute element={<AddCar />} allowedRoles={['admin']} />} />
        <Route path="/addexpense" element={<ProtectedRoute element={<AddExpense />} allowedRoles={['admin']} />} />
        <Route path="/driverdetails/:id" element={<ProtectedRoute element={<DriverDetails />} allowedRoles={['admin']} />} />
        <Route path="/cardetails/:id" element={<ProtectedRoute element={<CarDetails />} allowedRoles={['admin']} />} />
        
        {/* Driver Route */}
        <Route path="/trips" element={<ProtectedRoute element={<Trips />} allowedRoles={['driver', 'admin']} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);



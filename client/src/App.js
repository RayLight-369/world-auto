import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import Home from './Pages/Home/Home';
import TruckRental from './Pages/TruckRental/TruckRental';
import Header from "./Components/Header/Header";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import About from "./Pages/About/About";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Admin from "./Pages/Admin/Admin";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CarsProvider from "./Contexts/CarsContext";
import ManageCars from "./Pages/ManageCars/ManageCars";
import ManageBrands from "./Pages/ManageBrands/ManageBrands";
import CarDetails from "./Pages/CarDetails/CarDetails";
import Contact from "./Pages/Contact/Contact";
import SessionUserProvider from "./Contexts/SessionUserContext";
import { useState } from "react";
import ManageTrucks from "./Pages/ManageTrucks/ManageTrucks";




const App = () => {
  const location = useLocation();
  const [ adminVerified, setAdminVerified ] = useState( false );

  return (
    <SessionUserProvider>
      <CarsProvider>
        <MotionConfig transition={ {
          type: "just",
          staggerChildren: 0.1,
        } }>
          <AnimatePresence mode="wait">
            <Routes location={ location } key={ location.pathname }>
              <Route path="/" element={ <Header /> }>
                <Route index path="/" element={ <Home /> } />
                <Route path="about" element={ <About /> } />
                <Route path="contact" element={ <Contact /> } />
                <Route path="trucks" element={ <TruckRental /> } />
                <Route path="/car/:id" element={ <CarDetails /> } />
              </Route>
            </Routes>
          </AnimatePresence>
        </MotionConfig>
        <Routes>
          <Route path="admin" element={ <Admin adminVerified={ adminVerified } /> }>
            <Route index path="dashboard" element={ <Dashboard /> } />
            <Route path="login" element={ <AdminLogin adminVerified={ adminVerified } setAdminVerified={ setAdminVerified } /> } />
            <Route path="cars" element={ <ManageCars /> } />
            <Route path="brands" element={ <ManageBrands /> } />
            <Route path="trucks" element={ <ManageTrucks /> } />
          </Route>
        </Routes>
      </CarsProvider>
    </SessionUserProvider>
  );
};

const Root = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Root;

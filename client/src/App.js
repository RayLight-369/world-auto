import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import Home from './Pages/Home/Home';
import Header from "./Components/Header/Header";
import About from "./Pages/About/About";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Admin from "./Pages/Admin/Admin";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NewCar from "./Pages/NewCar/NewCar";
import CarsProvider from "./Contexts/CarsContext";

const App = () => {
  const location = useLocation();

  return (
    <CarsProvider>
      <MotionConfig transition={ {
        type: "just",
        staggerChildren: 0.1,
      } }>
        <AnimatePresence mode="wait">
          <Routes location={ location } key={ location.pathname }>
            <Route path="/" element={ <Header /> }>
              <Route loader index path="/" element={ <Home /> } />
              <Route path="about" element={ <About /> } />
            </Route>
            <Route path="admin" element={ <Admin /> }>
              <Route index path="dashboard" element={ <Dashboard /> } />
              <Route path="new-car" element={ <NewCar /> } />
            </Route>
          </Routes>
        </AnimatePresence>
      </MotionConfig>
    </CarsProvider>
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

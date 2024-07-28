import React from 'react';
import Styles from "./Home.module.css";
import Card from '../../Components/Card/Card';
import CreateAlert from '../../Components/CreateAlert/CreateAlert';
import { motion } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';

const Home = () => {

  const { cars } = useCars();

  const variants = {
    hidden: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 5
    }
  };

  return (
    <motion.section id={ Styles[ "home" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.section className={ Styles[ "search-section" ] } variants={ variants }>

        <h1 className={ Styles[ "ad-title" ] }>Buy your used car checked & guaranteed</h1>
        <input type="text" name="search" className={ Styles[ 'search-input' ] } placeholder='Make, Model, Fuel, Gearbox' />

      </motion.section>

      <motion.section className={ Styles[ "body" ] } variants={ variants }>
        <div className={ Styles[ "filters-part" ] }>
          <p>Filter your Search Criteria</p>
          <div className={ Styles[ "filters-container" ] }>

          </div>
        </div>
        <div className={ Styles[ "content" ] }>
          <div className={ Styles[ "list" ] }>
            { cars.length && cars.map( ( car, i ) => (
              <Card key={ car.id } id={ car.id } fuel={ car.fuel_type } ppd={ car.price_per_day } ppm={ car.price_per_month } distance={ car.mileage } guarantee={ car.guarantee } overview={ car.overview } title={ car.title } year={ car.model_year } manual={ car?.accessories.includes( "Automatic" ) } />
            ) ) }
          </div>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default Home;
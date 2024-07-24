import React from 'react';
import Styles from "./Home.module.css";
import Card from '../../Components/Card/Card';
import CreateAlert from '../../Components/CreateAlert/CreateAlert';
import { motion } from "framer-motion";

const Home = () => {

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
        </div>
        <div className={ Styles[ "content" ] }>
          <div className={ Styles[ "list" ] }>

          </div>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default Home;
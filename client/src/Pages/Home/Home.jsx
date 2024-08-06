import React, { useEffect, useMemo, useReducer, useState } from 'react';
import Styles from "./Home.module.css";
import Card from '../../Components/Card/Card';
import CreateAlert from '../../Components/CreateAlert/CreateAlert';
import { motion } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';
import PriceBox from "../../Components/PriceBox/PriceBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCross, faCrosshairs, faX } from '@fortawesome/free-solid-svg-icons';
import FiltersContainer from '../../Components/FiltersContainer/FiltersContainer';


const Home = () => {


  const { cars, brands } = useCars();
  const [ Cars, setCars ] = useState( cars );
  const [ shortcutFilterOpen, setShortcutFilterOpen ] = useState( false );
  const [ searchInputText, setSearchInputText ] = useState( "" );

  const [ filtersState, filterDistpatch ] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "brand": case "brands": {

        const Brands = state.Brands;

        if ( action.action == "add" && !Brands.includes( action.brand ) ) {

          Brands.push( action.brand );

        } else if ( action.action == "remove" && Brands.includes( action.brand ) ) {

          const index = Brands.indexOf( action.brand );

          Brands.splice( index, 1 );

        }

        return ( { ...state, Brands } );

      }

      case "gearbox": case "gb": {

        const Gearbox = state.Gearbox;

        if ( action.action == "add" && !Gearbox.includes( action.gearbox ) ) {

          Gearbox.push( action.gearbox );

        } else if ( action.action == "remove" && Gearbox.includes( action.gearbox ) ) {

          const index = Gearbox.indexOf( action.gearbox );

          Gearbox.splice( index, 1 );

        }

        return ( { ...state, Gearbox } );

      }

      case "fuel": case "fuels": {

        const Fuel_Types = state.Fuel_Types;

        if ( action.action == "add" && !Fuel_Types.includes( action.fuel ) ) {

          Fuel_Types.push( action.fuel );

        } else if ( action.action == "remove" && Fuel_Types.includes( action.fuel ) ) {

          const index = Fuel_Types.indexOf( action.fuel );

          Fuel_Types.splice( index, 1 );

        }

        return ( { ...state, Fuel_Types } );

      }

      case "price": case "prices": {

        if ( action.ptype == "start" ) {
          return ( {
            ...state,
            Price: {
              end: state.Price.end,
              start: action.start
            }
          } );
        } else {
          return ( {
            ...state,
            Price: {
              start: state.Price.start,
              end: action.end
            }
          } );
        }

      }

      case "year": case "my": {

        if ( action.ptype == "start" ) {
          return ( {
            ...state,
            Model_Year: {
              end: state.Model_Year.end,
              start: action.start
            }
          } );
        } else {
          return ( {
            ...state,
            Model_Year: {
              start: state.Model_Year.start,
              end: action.end
            }
          } );
        }

      }

      case "mileage": {

        if ( action.ptype == "start" ) {
          return ( {
            ...state,
            Mileage: {
              end: state.Mileage.end,
              start: action.start
            }
          } );
        } else {
          return ( {
            ...state,
            Mileage: {
              start: state.Mileage.start,
              end: action.end
            }
          } );
        }

      }

    }
  }, {
    Brands: [],
    Price: {
      start: 0,
      end: 0
    },
    Model_Year: {
      start: 0,
      end: 0
    },
    Mileage: {
      start: 0,
      end: 0
    },
    Fuel_Types: [],
    Gearbox: []
  } );


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



  useEffect( () => {

    const handleEvent = e => {
      const { scrollY } = window;
      const Filter = document.querySelector( "div." + Styles[ "filters-shortcut" ] + " > div" );

      if ( scrollY > 300 ) {
        Filter?.classList.add( Styles.appear );
      } else {
        Filter?.classList.remove( Styles.appear );
      }

    };

    document.addEventListener( "scroll", handleEvent );

    return () => document.removeEventListener( "scroll", handleEvent );

  }, [] );

  const filteredAndSortedCars = useMemo( () => {
    if ( !searchInputText ) return Cars;

    const searchTerms = searchInputText.toLowerCase().split( ' ' );
    return Cars.filter( car => {
      return searchTerms.every( term => {
        return (
          car.title.toLowerCase().includes( term ) ||
          car.model_year.toLowerCase().includes( term ) ||
          car.fuel_type.toLowerCase().includes( term ) ||
          car.gearbox.toLowerCase().includes( term ) ||
          car.overview.toLowerCase().includes( term )
        );
      } );
    } ).sort( ( a, b ) => {
      let relevanceA = 0;
      let relevanceB = 0;

      searchTerms.forEach( term => {
        if ( a.title.toLowerCase().includes( term ) ) relevanceA += 2;
        if ( b.title.toLowerCase().includes( term ) ) relevanceB += 2;
        if ( a.model_year.toLowerCase().includes( term ) ) relevanceA += 2;
        if ( b.model_year.toLowerCase().includes( term ) ) relevanceB += 2;
        if ( a.fuel_type.toLowerCase().includes( term ) ) relevanceA += 1;
        if ( b.fuel_type.toLowerCase().includes( term ) ) relevanceB += 1;
        if ( a.gearbox.toLowerCase().includes( term ) ) relevanceA += 1;
        if ( b.gearbox.toLowerCase().includes( term ) ) relevanceB += 1;
        if ( a.overview.toLowerCase().includes( term ) ) relevanceA += .4;
        if ( b.overview.toLowerCase().includes( term ) ) relevanceB += .4;
      } );

      return relevanceB - relevanceA;
    } );
  }, [ searchInputText, Cars ] );


  return (
    <motion.section id={ Styles[ "home" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.section className={ Styles[ "search-section" ] } variants={ variants }>

        <h1 className={ Styles[ "ad-title" ] }>Buy your used car checked & guaranteed</h1>
        <input type="text" name="search" className={ Styles[ 'search-input' ] } placeholder='Make, Model, Fuel, Gearbox' onChange={ e => setSearchInputText( e.target.value ) } value={ searchInputText } />

      </motion.section>

      <motion.section className={ Styles[ "body" ] } variants={ variants }>
        <FiltersContainer cars={ cars } Cars={ Cars } brands={ brands } setCars={ setCars } filterDistpatch={ filterDistpatch } filtersState={ filtersState } searchInputText={ searchInputText } />
        <div className={ Styles[ "content" ] }>
          <p className={ Styles[ "results" ] }>{ Cars?.length } Cars match your search</p>
          <div className={ Styles[ "list" ] }>
            { filteredAndSortedCars.length && filteredAndSortedCars.map( ( car, i ) => (
              <Card key={ car.id } img={ car.images[ 0 ] } id={ car.id } fuel={ car.fuel_type } ppd={ car.price_per_day } ppm={ car.price_per_month } distance={ car.mileage } guarantee={ car.guarantee } overview={ car.overview } title={ car.title } year={ car.model_year } manual={ !car?.accessories.includes( "Automatic" ) && car?.gearbox == "Manual" } />
            ) ) }
          </div>
        </div>
        <div className={ `${ Styles[ "filters-shortcut" ] } ${ shortcutFilterOpen && Styles.open }` }>
          <p className={ Styles[ "shortcut-icon" ] } onClick={ () => setShortcutFilterOpen( prev => !prev ) }><FontAwesomeIcon icon={ faBars } /></p>
          <FiltersContainer Cars={ Cars } cars={ cars } brands={ brands } setCars={ setCars } filterDistpatch={ filterDistpatch } filtersState={ filtersState } key={ 2 } />
        </div>
      </motion.section>
    </motion.section>
  );
};

export default Home;
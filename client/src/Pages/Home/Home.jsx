import { useEffect, useMemo, useReducer, useState } from 'react';
import Styles from "./Home.module.css";
import Card from '../../Components/Card/Card';
import CreateAlert from '../../Components/CreateAlert/CreateAlert';
import { motion } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import FiltersContainer from '../../Components/FiltersContainer/FiltersContainer';
import CardsContainer from '../../Components/CardsContainer/CardsContainer';
import useDebounce from '../../Hooks/useDebounce';


const Home = () => {


  const { cars, brands } = useCars();
  const [ Cars, setCars ] = useState( cars );
  const [ shortcutFilterOpen, setShortcutFilterOpen ] = useState( false );
  const [ searchInputText, setSearchInputText ] = useState( "" );
  const debouncedInputText = useDebounce( searchInputText, 500 );

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

    const searchTerms = debouncedInputText.toLowerCase().split( ' ' );
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
  }, [ debouncedInputText, Cars ] );


  return (
    <motion.section id={ Styles[ "home" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.section className={ Styles[ "search-section" ] } variants={ variants }>

        <h1 className={ Styles[ "ad-title" ] }>Achetez votre voiture d’occasion contrôlée & garantie</h1>
        <input type="text" name="search" className={ Styles[ 'search-input' ] } placeholder='Marque, Modèle, Carburant, Boite de vitesse' onChange={ e => setSearchInputText( e.target.value ) } value={ searchInputText } />

      </motion.section>

      <motion.section className={ Styles[ "body" ] } variants={ variants }>
        <FiltersContainer cars={ cars } Cars={ Cars } brands={ brands } setCars={ setCars } filterDistpatch={ filterDistpatch } filtersState={ filtersState } searchInputText={ searchInputText } />
        <div className={ Styles[ "content" ] }>
          <p className={ Styles[ "results" ] }>{ filteredAndSortedCars?.length } voitures correspondent à votre recherche</p>
          <CardsContainer filteredAndSortedCars={ filteredAndSortedCars } key={ "cars" } />
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
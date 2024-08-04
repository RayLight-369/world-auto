import React, { useEffect, useReducer, useState } from 'react';
import Styles from "./Home.module.css";
import Card from '../../Components/Card/Card';
import CreateAlert from '../../Components/CreateAlert/CreateAlert';
import { motion } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';
import PriceBox from "../../Components/PriceBox/PriceBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCross, faCrosshairs, faX } from '@fortawesome/free-solid-svg-icons';
const Home = () => {

  const [ filtersDivOpen, setFiltersDivOpen ] = useState( false );

  const { cars, brands } = useCars();
  const [ Cars, setCars ] = useState( cars );
  const [ brandFilterOpen, setBrandFilterOpen ] = useState( false );
  const [ priceFilterOpen, setPriceFilterOpen ] = useState( false );
  const [ fuelFilterOpen, setFuelFilterOpen ] = useState( false );
  const [ mileageFilterOpen, setMileageFilterOpen ] = useState( false );
  const [ gearboxFilterOpen, setGearboxFilterOpen ] = useState( false );
  const [ modelYearFilterOpen, setModelYearFilterOpen ] = useState( false );


  useEffect( () => {

    if ( cars.length && !Cars?.length ) setCars( cars );

    console.log( cars );

  }, [ cars ] );

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
    console.log( filtersState );
    const { Brands, Price, Fuel_Types, Mileage, Gearbox, Model_Year } = filtersState;

    console.log( "Brands: ", Brands );
    console.log( "Cars: ", Cars );
    console.log( "cars: ", cars );

    function BrandCheck ( item ) {
      if ( Brands.length > 0 ) {
        if ( Brands.includes( item.brand ) ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    }

    function GearboxCheck ( item ) {
      if ( Gearbox.length > 0 ) {
        if ( Gearbox.includes( item.gearbox ) ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    }

    function FuelCheck ( item ) {
      if ( Fuel_Types.length > 0 ) {
        if ( Fuel_Types.includes( item.fuel_type ) ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    }

    function PriceCheck ( item ) {

      const startCheck = Price.start ? item.price_per_day >= Price.start : true;

      const endCheck = Price.end ? item.price_per_day <= Price.end : true;

      return startCheck && endCheck;
    }

    function ModelYearCheck ( item ) {

      const startCheck = Model_Year.start ? item.model_year >= Model_Year.start : true;

      const endCheck = Model_Year.end ? item.model_year <= Model_Year.end : true;

      return startCheck && endCheck;
    }

    function MileageCheck ( item ) {

      const startCheck = Mileage.start ? +item.mileage >= Mileage.start : true;

      const endCheck = Mileage.end ? +item.mileage <= Mileage.end : true;

      return startCheck && endCheck;
    }

    setCars( cars.filter( car => BrandCheck( car ) && PriceCheck( car ) && FuelCheck( car ) && MileageCheck( car ) && GearboxCheck( car ) && ModelYearCheck( car ) ) );

    // if ( Brands.length > 0 )
    //   setCars( cars.filter( car => Brands.includes( car.brand ) ) );
    // else
    //   setCars( cars );

    // if ( Price ) {
    //   setCars( cars.filter( car => {



    //   } ) );
    // }


  }, [ filtersState ] );

  useEffect( () => {

    const handleEvent = e => {
      const { scrollY } = window;
      const Filter = document.querySelector( "div." + Styles[ "filters-part" ] );

      if ( scrollY > 150 ) {
        Filter.classList.add( Styles.fixed );
      } else {
        Filter.classList.remove( Styles.fixed );
      }

    };

    document.addEventListener( "scroll", handleEvent );

    return () => document.removeEventListener( "scroll", handleEvent );

  }, [] );


  return (
    <motion.section id={ Styles[ "home" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.section className={ Styles[ "search-section" ] } variants={ variants }>

        <h1 className={ Styles[ "ad-title" ] }>Buy your used car checked & guaranteed</h1>
        <input type="text" name="search" className={ Styles[ 'search-input' ] } placeholder='Make, Model, Fuel, Gearbox' />

      </motion.section>

      <motion.section className={ Styles[ "body" ] } variants={ variants }>
        <div className={ Styles[ "filters-part" ] }>
          <p>Filter your Search Criteria <span onClick={ () => {
            setFiltersDivOpen( prev => !prev );
          } }><FontAwesomeIcon icon={ filtersDivOpen ? faX : faBars } /></span></p>
          <div className={ `${ Styles[ "filters-container" ] } ${ filtersDivOpen && Styles[ "open" ] }` }>
            <div className={ `${ Styles[ "some-filter" ] } ${ brandFilterOpen && Styles[ "open" ] }` } onClick={ () => setBrandFilterOpen( prev => !prev ) }>
              <div className={ Styles[ "title" ] }>
                <p className={ Styles[ "name" ] }>BRAND</p>
                <p className={ Styles[ "indicator" ] }>{ ">" }</p>
              </div>
              <div className={ `${ Styles[ "some-container" ] } ${ brandFilterOpen && Styles[ "open" ] }` }>
                { brands?.map( ( b, i ) => (
                  <div className={ Styles[ "brand" ] } key={ i } onClick={ e => e.stopPropagation() }>
                    <p className={ Styles[ "brand-name" ] }>{ b.brandName }</p>
                    <input type="checkbox" onChange={ e => {
                      if ( e.target.checked ) {
                        filterDistpatch( {
                          type: "brand",
                          action: "add",
                          brand: b.id
                        } );
                      } else {
                        filterDistpatch( {
                          type: "brand",
                          action: "remove",
                          brand: b.id
                        } );
                      }
                    } } />
                  </div>
                ) ) }
              </div>
            </div>
            <div className={ `${ Styles[ "some-filter" ] } ${ priceFilterOpen && Styles[ "open" ] }` } onClick={ () => setPriceFilterOpen( prev => !prev ) }>
              <div className={ Styles[ "title" ] }>
                <p className={ Styles[ "name" ] }>PRICE</p>
                <p className={ Styles[ "indicator" ] }>{ ">" }</p>
              </div>
              <div className={ `${ Styles[ "some-container" ] } ${ priceFilterOpen && Styles[ "open" ] }` }>
                <div className={ Styles[ "prices" ] } onClick={ e => e.stopPropagation() }>
                  <input min={ 1 } type="number" name="starting" value={ filtersState.Price.start } className={ Styles[ 'starting-price' ] } onChange={ e => filterDistpatch( {
                    type: "price",
                    ptype: "start",
                    start: +e.target.value
                  } ) } />
                  <p className={ Styles[ "to" ] }>to</p>
                  <input min={ 1 } type="number" name="ending" value={ filtersState.Price.end } className={ Styles[ 'ending-price' ] } onChange={ e => filterDistpatch( {
                    type: "price",
                    ptype: "end",
                    end: +e.target.value
                  } ) } />
                </div>
              </div>
            </div>
            <div className={ `${ Styles[ "some-filter" ] } ${ fuelFilterOpen && Styles[ "open" ] }` } onClick={ () => setFuelFilterOpen( prev => !prev ) }>
              <div className={ Styles[ "title" ] }>
                <p className={ Styles[ "name" ] }>FUEL</p>
                <p className={ Styles[ "indicator" ] }>{ ">" }</p>
              </div>
              <div className={ `${ Styles[ "some-container" ] } ${ fuelFilterOpen && Styles[ "open" ] }` }>
                { [ "Diesel", "Petrol", "CNG", "Electric" ].map( ( b, i ) => (
                  <div className={ Styles[ "fuel" ] } key={ i } onClick={ e => e.stopPropagation() }>
                    <p className={ Styles[ "fuel-type" ] }>{ b }</p>
                    <input type="checkbox" onChange={ e => {
                      if ( e.target.checked ) {
                        filterDistpatch( {
                          type: "fuel",
                          action: "add",
                          fuel: b
                        } );
                      } else {
                        filterDistpatch( {
                          type: "fuel",
                          action: "remove",
                          fuel: b
                        } );
                      }
                    } } />
                  </div>
                ) ) }
              </div>
            </div>
            <div className={ `${ Styles[ "some-filter" ] } ${ mileageFilterOpen && Styles[ "open" ] }` } onClick={ () => setMileageFilterOpen( prev => !prev ) }>
              <div className={ Styles[ "title" ] }>
                <p className={ Styles[ "name" ] }>MILEAGE</p>
                <p className={ Styles[ "indicator" ] }>{ ">" }</p>
              </div>
              <div className={ `${ Styles[ "some-container" ] } ${ mileageFilterOpen && Styles[ "open" ] }` }>
                <div className={ Styles[ "mileage-range" ] } onClick={ e => e.stopPropagation() }>
                  <input min={ 1 } type="number" name="starting" value={ filtersState.Mileage.start } className={ Styles[ 'starting-mileage' ] } onChange={ e => filterDistpatch( {
                    type: "mileage",
                    ptype: "start",
                    start: +e.target.value
                  } ) } />
                  <p className={ Styles[ "to" ] }>to</p>
                  <input min={ 1 } type="number" name="ending" value={ filtersState.Mileage.end } className={ Styles[ 'ending-mileage' ] } onChange={ e => filterDistpatch( {
                    type: "mileage",
                    ptype: "end",
                    end: +e.target.value
                  } ) } />
                </div>
              </div>
            </div>
            <div className={ `${ Styles[ "some-filter" ] } ${ gearboxFilterOpen && Styles[ "open" ] }` } onClick={ () => setGearboxFilterOpen( prev => !prev ) }>
              <div className={ Styles[ "title" ] }>
                <p className={ Styles[ "name" ] }>GEARBOX</p>
                <p className={ Styles[ "indicator" ] }>{ ">" }</p>
              </div>
              <div className={ `${ Styles[ "some-container" ] } ${ gearboxFilterOpen && Styles[ "open" ] }` }>
                { [ "Manual", "Automatic", "Continuously variable automatic" ].map( ( b, i ) => (
                  <div className={ Styles[ "gearbox" ] } key={ i } onClick={ e => e.stopPropagation() }>
                    <p className={ Styles[ "gearbox-type" ] }>{ b }</p>
                    <input type="checkbox" onChange={ e => {
                      if ( e.target.checked ) {
                        filterDistpatch( {
                          type: "gearbox",
                          action: "add",
                          gearbox: b
                        } );
                      } else {
                        filterDistpatch( {
                          type: "gearbox",
                          action: "remove",
                          gearbox: b
                        } );
                      }
                    } } />
                  </div>
                ) ) }
              </div>
            </div>
            <div className={ `${ Styles[ "some-filter" ] } ${ modelYearFilterOpen && Styles[ "open" ] }` } onClick={ () => setModelYearFilterOpen( prev => !prev ) }>
              <div className={ Styles[ "title" ] }>
                <p className={ Styles[ "name" ] }>YEAR</p>
                <p className={ Styles[ "indicator" ] }>{ ">" }</p>
              </div>
              <div className={ `${ Styles[ "some-container" ] } ${ modelYearFilterOpen && Styles[ "open" ] }` }>
                <div className={ Styles[ "year-range" ] } onClick={ e => e.stopPropagation() }>
                  <input min={ 1 } type="number" name="starting" value={ filtersState.Model_Year.start } className={ Styles[ 'starting-year' ] } onChange={ e => filterDistpatch( {
                    type: "my",
                    ptype: "start",
                    start: +e.target.value
                  } ) } />
                  <p className={ Styles[ "to" ] }>to</p>
                  <input min={ 1 } type="number" name="ending" value={ filtersState.Model_Year.end } className={ Styles[ 'ending-year' ] } onChange={ e => filterDistpatch( {
                    type: "my",
                    ptype: "end",
                    end: +e.target.value
                  } ) } />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ Styles[ "content" ] }>
          <p className={ Styles[ "results" ] }>{ Cars?.length } Cars match your search</p>
          <div className={ Styles[ "list" ] }>
            { Cars.length && Cars.map( ( car, i ) => (
              <Card key={ car.id } img={ car.images[ 0 ] } id={ car.id } fuel={ car.fuel_type } ppd={ car.price_per_day } ppm={ car.price_per_month } distance={ car.mileage } guarantee={ car.guarantee } overview={ car.overview } title={ car.title } year={ car.model_year } manual={ car?.accessories.includes( "Automatic" ) } />
            ) ) }
          </div>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default Home;
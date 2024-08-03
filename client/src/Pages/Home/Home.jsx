import React, { useEffect, useReducer, useState } from 'react';
import Styles from "./Home.module.css";
import Card from '../../Components/Card/Card';
import CreateAlert from '../../Components/CreateAlert/CreateAlert';
import { motion } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';
import PriceBox from "../../Components/PriceBox/PriceBox";
const Home = () => {

  const { cars, brands } = useCars();
  const [ Cars, setCars ] = useState( cars );
  const [ brandFilterOpen, setBrandFilterOpen ] = useState( false );
  const [ priceFilterOpen, setPriceFilterOpen ] = useState( false );

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

    }
  }, {
    Brands: [],
    Price: {
      start: 0,
      end: 0
    }
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
    const { Brands, Price } = filtersState;

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

    function PriceCheck ( item ) {
      const startCheck = Price.start ? item.price_per_day >= Price.start : true;

      const endCheck = Price.end ? item.price_per_day <= Price.end : true;

      return startCheck && endCheck;
    }

    setCars( cars.filter( car => BrandCheck( car ) && PriceCheck( car ) ) );

    // if ( Brands.length > 0 )
    //   setCars( cars.filter( car => Brands.includes( car.brand ) ) );
    // else
    //   setCars( cars );

    // if ( Price ) {
    //   setCars( cars.filter( car => {



    //   } ) );
    // }


  }, [ filtersState ] );


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
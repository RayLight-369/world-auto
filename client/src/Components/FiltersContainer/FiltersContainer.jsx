import { useState, useEffect, useReducer, memo, useMemo } from 'react';

import Styles from "./FiltersContainer.module.css";
import { useCars } from '../../Contexts/CarsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretRight, faX } from '@fortawesome/free-solid-svg-icons';
import { getFormattedNumber } from '../../Constants';


const FilterPart = ( { filterOpen, setFilterOpen, label, children } ) => (
  <div className={ `${ Styles[ "some-filter" ] } ${ filterOpen && Styles[ "open" ] }` } onClick={ () => setFilterOpen( prev => !prev ) }>
    <div className={ Styles[ "title" ] }>
      <p className={ Styles[ "name" ] }>{ label }</p>
      <p className={ Styles[ "indicator" ] }><FontAwesomeIcon icon={ faCaretRight } /></p>
    </div>
    <div className={ `${ Styles[ "some-container" ] } ${ filterOpen && Styles[ "open" ] }` }>
      { children }
    </div>
  </div>
);


const FiltersContainer = ( { cars, Cars, brands, setCars, filtersState, filterDistpatch, handleGetMore, searchInputText } ) => {

  const [ filtersDivOpen, setFiltersDivOpen ] = useState( false );

  const [ brandFilterOpen, setBrandFilterOpen ] = useState( false );
  const [ priceFilterOpen, setPriceFilterOpen ] = useState( false );
  const [ fuelFilterOpen, setFuelFilterOpen ] = useState( false );
  const [ mileageFilterOpen, setMileageFilterOpen ] = useState( false );
  const [ gearboxFilterOpen, setGearboxFilterOpen ] = useState( false );
  const [ modelYearFilterOpen, setModelYearFilterOpen ] = useState( false );


  useEffect( () => {
    //  && !Cars?.length
    if ( cars.length && cars != Cars ) setCars( cars );

    // console.log( cars );

  }, [ cars ] );

  useEffect( () => {
    // console.log( filtersState );

    if ( filtersState ) {
      const { Brands, Price, Fuel_Types, Mileage, Gearbox, Model_Year } = filtersState;


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

        const startCheck = Price.start ? getFormattedNumber( item.price_per_day ) >= Price.start : true;

        const endCheck = Price.end ? getFormattedNumber( item.price_per_day ) <= Price.end : true;

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

      const filteredCars = cars.filter( car => BrandCheck( car ) && PriceCheck( car ) && FuelCheck( car ) && MileageCheck( car ) && GearboxCheck( car ) && ModelYearCheck( car ) );

      // if ( filteredCars != cars )
      // if ( filteredCars.length ) {

      setCars( filteredCars );
      if ( !filteredCars.length ) {
        handleGetMore();
      }

    }
  }, [ filtersState, cars ] );




  // if ( !filtersState ) return <p>Loading...</p>;

  return (
    <div className={ Styles[ "filters-part" ] }>
      <p>Filtres <span onClick={ () => {
        setFiltersDivOpen( prev => !prev );
      } }><FontAwesomeIcon icon={ filtersDivOpen ? faX : faBars } /></span></p>
      <div className={ `${ Styles[ "filters-container" ] } ${ filtersDivOpen && Styles[ "open" ] }` }>
        <FilterPart filterOpen={ brandFilterOpen } setFilterOpen={ setBrandFilterOpen } label={ "MARQUE" } key={ "brands" }>
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
              } } checked={ filtersState?.Brands.includes( b.id ) } />
            </div>
          ) ) }
        </FilterPart>
        <FilterPart filterOpen={ priceFilterOpen } setFilterOpen={ setPriceFilterOpen } label={ "PRIX" } key={ "price" }>
          <div className={ Styles[ "prices" ] } onClick={ e => e.stopPropagation() }>
            <input min={ 1 } type="number" name="starting" value={ filtersState?.Price.start } className={ Styles[ 'starting-price' ] } onChange={ e => filterDistpatch( {
              type: "price",
              ptype: "start",
              start: +e.target.value
            } ) } />
            <p className={ Styles[ "to" ] }>Jusqu'à</p>
            <input min={ 1 } type="number" name="ending" value={ filtersState?.Price.end } className={ Styles[ 'ending-price' ] } onChange={ e => filterDistpatch( {
              type: "price",
              ptype: "end",
              end: +e.target.value
            } ) } />
          </div>
        </FilterPart>
        <FilterPart label={ "CARBURANT" } filterOpen={ fuelFilterOpen } setFilterOpen={ setFuelFilterOpen } key={ "fuel" }>
          { [ "Diesel", "Unleaded Petrol", "CNG", "Electric" ].map( ( b, i ) => (
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
              } } checked={ filtersState?.Fuel_Types.includes( b ) } />
            </div>
          ) ) }
        </FilterPart>
        <FilterPart filterOpen={ mileageFilterOpen } setFilterOpen={ setMileageFilterOpen } label={ "Kilomètrage" } key={ "mileage" }>
          <div className={ Styles[ "mileage-range" ] } onClick={ e => e.stopPropagation() }>
            <input min={ 1 } type="number" name="starting" value={ filtersState?.Mileage.start } className={ Styles[ 'starting-mileage' ] } onChange={ e => filterDistpatch( {
              type: "mileage",
              ptype: "start",
              start: +e.target.value
            } ) } />
            <p className={ Styles[ "to" ] }>Jusqu'à</p>
            <input min={ 1 } type="number" name="ending" value={ filtersState?.Mileage.end } className={ Styles[ 'ending-mileage' ] } onChange={ e => filterDistpatch( {
              type: "mileage",
              ptype: "end",
              end: +e.target.value
            } ) } />
          </div>
        </FilterPart>
        <FilterPart filterOpen={ gearboxFilterOpen } setFilterOpen={ setGearboxFilterOpen } label={ "Boite de vitesse" } key={ "gearbox" }>
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
              } } checked={ filtersState?.Gearbox.includes( b ) } />
            </div>
          ) ) }
        </FilterPart>
        <FilterPart filterOpen={ modelYearFilterOpen } setFilterOpen={ setModelYearFilterOpen } label={ "Année" } key={ "year" }>
          <div className={ Styles[ "year-range" ] } onClick={ e => e.stopPropagation() }>
            <input min={ 1 } type="number" name="starting" value={ filtersState?.Model_Year.start } className={ Styles[ 'starting-year' ] } onChange={ e => filterDistpatch( {
              type: "my",
              ptype: "start",
              start: +e.target.value
            } ) } />
            <p className={ Styles[ "to" ] }>Jusqu'à</p>
            <input min={ 1 } type="number" name="ending" value={ filtersState?.Model_Year.end } className={ Styles[ 'ending-year' ] } onChange={ e => filterDistpatch( {
              type: "my",
              ptype: "end",
              end: +e.target.value
            } ) } />
          </div>
        </FilterPart>
      </div>
    </div>
  );
};

export default memo( FiltersContainer );
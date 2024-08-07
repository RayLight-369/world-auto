import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../Constants';

const CarsContext = createContext();

export const useCars = () => {
  return useContext( CarsContext );
};


const CarsProvider = ( { children } ) => {

  const [ cars, setCars ] = useState( [] );
  const [ truck, setTrucks ] = useState( [] );
  const [ brands, setBrands ] = useState( [] );
  const [ carsLoading, setCarsLoading ] = useState( true );
  // const [ currentCar, setCurrentCar ] = useState( null );
  // const [ cycles, setCycles ] = useState( 0 );

  useEffect( () => {
    async function fetchData () {
      try {
        const carsRes = await fetch( API.GET_CARS );
        if ( !carsRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ carsRes.status } ${ carsRes.statusText }` );
        }
        const carsData = await carsRes.json();
        setCars( carsData.data );

        const trucksRes = await fetch( API.GET_TRUCKS );
        if ( !trucksRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ trucksRes.status } ${ trucksRes.statusText }` );
        }
        const trucksData = await trucksRes.json();
        setCars( trucksData.data );

        const brandsRes = await fetch( API.GET_BRANDS );
        if ( !brandsRes.ok ) {
          throw new Error( `Failed to fetch brands: ${ brandsRes.status } ${ brandsRes.statusText }` );
        }
        const brandsData = await brandsRes.json();
        setBrands( brandsData.data );
      } catch ( e ) {
        console.error( "Fetch error:", e.message );
        // if ( cycles < 5 ) {
        //   setCycles( prev => prev + 1 );
        //   setCarsLoading( true );
        //   fetchData();
        // }
      } finally {
        setCarsLoading( false );
      }
    }

    fetchData();
  }, [] );

  return (
    <CarsContext.Provider value={ { cars, setCars, carsLoading, brands, setBrands } }>{ children }</CarsContext.Provider>
  );
};

export default CarsProvider;
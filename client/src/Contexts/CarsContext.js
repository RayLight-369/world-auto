import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../Constants';

const CarsContext = createContext();

export const useCars = () => {
  return useContext( CarsContext );
};


const CarsProvider = ( { children } ) => {

  const [ cars, setCars ] = useState( [] );
  const [ trucks, setTrucks ] = useState( [] );
  const [ brands, setBrands ] = useState( [] );
  const [ carsLoading, setCarsLoading ] = useState( true );
  const [ carPages, setCarPages ] = useState( {
    lastIndex: -1,
    hasMore: false
  } );

  const [ truckPages, setTruckPages ] = useState( {
    lastIndex: -1,
    hasMore: false
  } );

  // const [ currentCar, setCurrentCar ] = useState( null );
  // const [ cycles, setCycles ] = useState( 0 );

  useEffect( () => {
    async function fetchData () {
      setCarsLoading( true );
      try {
        const carsRes = await fetch( `${ API.GET_CARS }/${ -1 }` );
        if ( !carsRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ carsRes.status } ${ carsRes.statusText }` );
        }
        const carsData = await carsRes.json();
        setCars( carsData.data );
        setCarPages( {
          lastIndex: carsData.data.length - 1,
          hasMore: !!carsData.remaining
        } );

        const brandsRes = await fetch( API.GET_BRANDS );
        if ( !brandsRes.ok ) {
          throw new Error( `Failed to fetch brands: ${ brandsRes.status } ${ brandsRes.statusText }` );
        }
        const brandsData = await brandsRes.json();
        setBrands( brandsData.data );

        const trucksRes = await fetch( `${ API.GET_TRUCKS }/${ -1 }` );
        if ( !trucksRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ trucksRes.status } ${ trucksRes.statusText }` );
        }
        const trucksData = await trucksRes.json();
        setTrucks( trucksData.data );
        setTruckPages( {
          lastIndex: trucksData.data.length - 1,
          hasMore: !!trucksData.remaining
        } );

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
    <CarsContext.Provider value={ { cars, setCars, carsLoading, brands, setBrands, trucks, setTrucks, truckPages, carPages, setCarPages, setTruckPages } }>{ children }</CarsContext.Provider>
  );
};

export default CarsProvider;
import { createContext, useContext, useEffect, useState } from 'react';

const CarsContext = createContext( [] );

export const useCars = () => {
  return useContext( CarsContext );
};


const CarsProvider = ( { children } ) => {

  const [ cars, setCars ] = useState( [] );
  const [ brands, setBrands ] = useState( [] );
  const [ carsLoading, setCarsLoading ] = useState( true );
  const [ currentCar, setCurrentCar ] = useState( null );

  useEffect( () => {

    async function fetchData () {
      try {
        const carsRes = await fetch( "https://world-auto-api.vercel.app/admin/cars" );
        const brandsRes = await fetch( "https://world-auto-api.vercel.app/admin/brands" );

        if ( carsRes.ok ) {
          const body = await carsRes.json();
          console.log( body );
          setCars( body.data );
        }

        if ( brandsRes.ok ) {
          const body = await brandsRes.json();
          console.log( body );
          setBrands( body.data );
        }

      } catch ( e ) {
        console.log( e );
      } finally {
        setCarsLoading( false );
      }

    }

    fetchData();

  }, [] );

  return (
    <CarsContext.Provider value={ { cars, setCars, carsLoading, currentCar, setCurrentCar, brands, setBrands } }>{ children }</CarsContext.Provider>
  );
};

export default CarsProvider;
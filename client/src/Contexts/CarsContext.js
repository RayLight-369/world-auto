import { createContext, useContext, useEffect, useState } from 'react';

const CarsContext = createContext( [] );

export const useCars = () => {
  return useContext( CarsContext );
};


const CarsProvider = ( { children } ) => {

  const [ cars, setCars ] = useState( [] );
  const [ carsLoading, setCarsLoading ] = useState( true );
  const [ currentCar, setCurrentCar ] = useState( null );

  useEffect( () => {

    async function fetchData () {

      const res = await fetch( "https://world-auto-api.vercel.app/admin/cars" );

      if ( res.ok ) {
        const body = await res.json();
        console.log( body );
        setCars( body.data );
      }

      setCarsLoading( false );
    }

    fetchData();

  }, [] );

  return (
    <CarsContext.Provider value={ { cars, setCars, carsLoading, currentCar, setCurrentCar } }>{ children }</CarsContext.Provider>
  );
};

export default CarsProvider;
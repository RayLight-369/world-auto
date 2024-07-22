import { createContext, useContext, useEffect, useState } from 'react';

const CarsContext = createContext();

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
        if ( !carsRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ carsRes.status } ${ carsRes.statusText }` );
        }
        const carsData = await carsRes.json();
        setCars( carsData.data );

        const brandsRes = await fetch( "https://world-auto-api.vercel.app/admin/brands" );
        if ( !brandsRes.ok ) {
          throw new Error( `Failed to fetch brands: ${ brandsRes.status } ${ brandsRes.statusText }` );
        }
        const brandsData = await brandsRes.json();
        setBrands( brandsData.data );
      } catch ( e ) {
        console.error( "Fetch error:", e.message );
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
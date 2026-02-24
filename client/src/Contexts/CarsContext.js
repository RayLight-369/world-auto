import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../Constants';

const CarsContext = createContext();

export const useCars = () => {
  return useContext( CarsContext );
};


const CarsProvider = ( { children } ) => {

  const [ rentalCars, setRentalCars ] = useState( [] );
  const [ cars, setCars ] = useState( [] );
  const [ trucks, setTrucks ] = useState( [] );
  const [ brands, setBrands ] = useState( [] );
  const [ rates, setRates ] = useState( [] );
  const [ carsLoading, setCarsLoading ] = useState( true );
  const [ carPages, setCarPages ] = useState( {
    lastIndex: -1,
    hasMore: false
  } );

  const [ rentalCarPages, setRentalCarPages ] = useState( {
    lastIndex: -1,
    hasMore: false
  } );

  const [ truckPages, setTruckPages ] = useState( {
    lastIndex: -1,
    hasMore: false
  } );


  useEffect( () => {
    async function fetchData() {
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
          hasMore: !!( carsData.remaining - carsData.data.length )
        } );


        const rentalCarsRes = await fetch( `${ API.GET_RENTAL_CARS }/${ -1 }` );
        if ( !rentalCarsRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ rentalCarsRes.status } ${ rentalCarsRes.statusText }` );
        }
        const rentalCarsData = await rentalCarsRes.json();
        setRentalCars( rentalCarsData.data );
        setRentalCarPages( {
          lastIndex: rentalCarsData.data.length - 1,
          hasMore: !!( rentalCarsData.remaining - rentalCarsData.data.length )
        } );



        const brandsRes = await fetch( API.GET_BRANDS );
        if ( !brandsRes.ok ) {
          throw new Error( `Failed to fetch brands: ${ brandsRes.status } ${ brandsRes.statusText }` );
        }
        const brandsData = await brandsRes.json();
        setBrands( brandsData.data );



        const ratesRes = await fetch( API.GET_RATES );
        if ( !ratesRes.ok ) {
          throw new Error( `Failed to fetch rates: ${ ratesRes.status } ${ ratesRes.statusText }` );
        }
        const ratesData = await ratesRes.json();
        setRates( ratesData.data );



        const trucksRes = await fetch( `${ API.GET_TRUCKS }/${ -1 }` );
        if ( !trucksRes.ok ) {
          throw new Error( `Failed to fetch cars: ${ trucksRes.status } ${ trucksRes.statusText }` );
        }
        const trucksData = await trucksRes.json();
        setTrucks( trucksData.data );
        setTruckPages( {
          lastIndex: trucksData.data.length - 1,
          hasMore: !!( trucksData.remaining - trucksData.data.length )
        } );

      } catch ( e ) {
        console.error( "Fetch error:", e.message );
      } finally {
        setCarsLoading( false );
      }
    }

    fetchData();
  }, [] );

  return (
    <CarsContext.Provider value={ { cars, setCars, carsLoading, brands, setBrands, rates, setRates, trucks, setTrucks, truckPages, carPages, setCarPages, setTruckPages, rentalCars, rentalCarPages } }>{ children }</CarsContext.Provider>
  );
};

export default CarsProvider;
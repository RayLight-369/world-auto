import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../Constants';

const CarsContext = createContext();

export const useCars = () => {
  return useContext( CarsContext );
};


const CarsProvider = ( { children } ) => {

  // utility to remove duplicates by "id" property
  const dedupeById = arr => {
    const map = new Map();
    arr.forEach(item => {
      if (item && item.id != null) map.set(item.id, item);
    });
    return Array.from(map.values());
  };

  const [ rentalCars, _setRentalCars ] = useState( [] );
  const [ cars, _setCars ] = useState( [] );
  const [ trucks, _setTrucks ] = useState( [] );
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

  // wrappers that keep lists unique
  const setCars = data => _setCars(dedupeById(data));
  const setRentalCars = data => _setRentalCars(dedupeById(data));
  const setTrucks = data => _setTrucks(dedupeById(data));

  const appendCars = newItems => _setCars(prev => dedupeById(prev.concat(newItems)));
  const appendRentalCars = newItems => _setRentalCars(prev => dedupeById(prev.concat(newItems)));
  const appendTrucks = newItems => _setTrucks(prev => dedupeById(prev.concat(newItems)));


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
    <CarsContext.Provider value={ {
      cars,
      setCars,
      appendCars,
      carsLoading,
      brands,
      setBrands,
      rates,
      setRates,
      trucks,
      setTrucks,
      appendTrucks,
      truckPages,
      carPages,
      setCarPages,
      setTruckPages,
      rentalCars,
      setRentalCars,
      appendRentalCars,
      rentalCarPages,
      setRentalCarPages
    } }>{ children }</CarsContext.Provider>
  );
};

export default CarsProvider;
import { useEffect } from 'react';
import Card from '../Card/Card';
import Styles from "./CardsContainer.module.css";

const CardsContainer = ( { filteredAndSortedCars, type = "car", carLoading } ) => {
  useEffect( () => {
    console.log( filteredAndSortedCars.map( car => car.id ) );
  }, [ filteredAndSortedCars ] );

  // ensure the list has unique ids before rendering
  const uniqueCars = (() => {
    const seen = new Map();
    filteredAndSortedCars.forEach(car => {
      if (car && car.id != null && !seen.has(car.id)) {
        seen.set(car.id, car);
      }
    });
    return Array.from(seen.values());
  })();

  return (
    <div className={ Styles[ "list" ] }>
      { uniqueCars.length ? uniqueCars.map( ( car ) => (
        <Card type={ type } key={ car.id } emission={ car.emission } img={ car.images[ 0 ] } color={ car.color } id={ car.id } fuel={ car.fuel_type } ppd={ car.price_per_day } pph={ type == "trucks-rental" ? car.price_per_hour : null } ppw={ car.price_per_week } ppwe={ car.price_per_weekend } distance={ car.mileage } guarantee={ car.guarantee } overview={ car.overview } title={ car.title } year={ car.model_year } manual={ car?.gearbox || ( car?.accessories.includes( "Automatique" ) && "Automatique" ) } sold={ car.sold } rent={ car.rent } />
      ) ) : carLoading ? (
        <p>Loading...</p>
      ) : (
        <p>No { type } found!</p>
      ) }
    </div>
  );
};

export default CardsContainer;
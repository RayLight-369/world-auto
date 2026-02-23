import Card from '../Card/Card';
import Styles from "./CardsContainer.module.css";

const CardsContainer = ( { filteredAndSortedCars, type = "car", carLoading } ) => {
  return (
    <div className={ Styles[ "list" ] }>
      { filteredAndSortedCars.length ? filteredAndSortedCars.map( ( car ) => (
        <Card type={ type } key={ car.id } img={ car.images[ 0 ] } id={ car.id } fuel={ car.fuel_type } ppd={ car.price_per_day } distance={ car.mileage } guarantee={ car.guarantee } overview={ car.overview } title={ car.title } year={ car.model_year } manual={ car?.gearbox || ( car?.accessories.includes( "Automatique" ) && "Automatique" ) } sold={ car.sold } />
      ) ) : carLoading ? (
        <p>Loading...</p>
      ) : (
        <p>No { type } found!</p>
      ) }
    </div>
  );
};

export default CardsContainer;
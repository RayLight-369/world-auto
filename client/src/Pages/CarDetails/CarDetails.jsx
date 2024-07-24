import React, { useEffect } from 'react';
import styles from './CarDetails.module.css';
import { useSearchParams } from "react-router-dom";
import { API } from '../../Constants';


const CarDetails = () => {

  const [ params ] = useSearchParams();

  useEffect( () => {
    ( async () => {

      const id = params.get( "id" );
      const res = await fetch( API.GET_CAR );


    } )();
  }, [ params ] );

  return (
    <div className={ styles.card }>
      <div className={ styles.header }>
        <h1 className={ styles.title }>{ car.title }</h1>
        <p className={ styles.overview }>{ car.overview }</p>
      </div>
      <div className={ styles.details }>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Brand:</span>
          <span className={ styles.value }>{ car.brand }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Fuel Type:</span>
          <span className={ styles.value }>{ car.fuel_type }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Price Per Day:</span>
          <span className={ styles.value }>${ car.price_per_day }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Price Per Month:</span>
          <span className={ styles.value }>${ car.price_per_month }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Mileage:</span>
          <span className={ styles.value }>{ car.mileage } km</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Energy:</span>
          <span className={ styles.value }>{ car.energy }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Guarantee:</span>
          <span className={ styles.value }>{ car.guarantee }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Color:</span>
          <span className={ styles.value }>{ car.color }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Certificate:</span>
          <span className={ styles.value }>{ car.certificate }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Emission:</span>
          <span className={ styles.value }>{ car.emission }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Model Year:</span>
          <span className={ styles.value }>{ car.model_year }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Seating Capacity:</span>
          <span className={ styles.value }>{ car.seating_capacity }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Gearbox:</span>
          <span className={ styles.value }>{ car.gearbox }</span>
        </div>
        <div className={ styles.detailItem }>
          <span className={ styles.label }>Due Date:</span>
          <span className={ styles.value }>{ car.due_date }</span>
        </div>
        <div className={ styles.accessories }>
          <h2 className={ styles.accessoriesTitle }>Accessories:</h2>
          <ul className={ styles.accessoriesList }>
            { car.accessories.map( ( acc, index ) => (
              <li key={ index } className={ styles.accessoryItem }>{ acc }</li>
            ) ) }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;

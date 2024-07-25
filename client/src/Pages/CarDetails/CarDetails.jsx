import React, { useEffect, useState } from 'react';
import styles from './CarDetails.module.css';
import { useParams } from "react-router-dom";
import { API } from '../../Constants';

const CarDetails = () => {
  const { id } = useParams();
  const [ car, setCar ] = useState( null );

  useEffect( () => {
    console.log( id );
    const fetchCar = async () => {
      const res = await fetch( API.GET_CAR( id ) );
      if ( res.ok ) {
        const body = await res.json();
        console.log( body?.data );
        setCar( body.data[ 0 ] );
      } else {
        console.error( 'Failed to fetch car data' );
      }
    };

    fetchCar();
  }, [ id ] );

  if ( !car ) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.card }>
        <div className={ styles.header }>
          <h1 className={ styles.title }>{ car.title }</h1>
          <p className={ styles.overview }>{ car.overview }</p>
        </div>
        <div className={ styles.mainContent }>
          <div className={ styles.imageSection }>
            <img src={ car.image } alt={ car.title } className={ styles.carImage } />
          </div>
          <div className={ styles.detailsSection }>
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
          </div>
        </div>
        <div className={ styles.accessoriesSection }>
          <h2 className={ styles.accessoriesTitle }>Accessories:</h2>
          <ul className={ styles.accessoriesList }>
            { car?.accessories?.map( ( acc, index ) => (
              <li key={ index } className={ styles.accessoryItem }>{ acc }</li>
            ) ) }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;

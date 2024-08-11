import React, { useEffect, useMemo, useState } from 'react';
import styles from './TruckDetails.module.css';
import { useParams } from "react-router-dom";
import { API } from '../../Constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, Keyboard, Mousewheel, Scrollbar, Zoom } from "swiper/modules";
import { useCars } from '../../Contexts/CarsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSnowflake,      // Air Conditioner
  faLock,           // Power Door Locks
  faCar,            // AntiLock Braking System
  faLifeRing,       // Brake Assist
  faCog,            // Power Steering
  faUser,           // Driver Airbag
  faUserFriends,    // Passenger Airbag
  faWindowRestore,  // Power Windows
  faCompactDisc,    // CD Player
  faLockOpen,       // Central Locking
  faCarCrash,       // Crash Sensor
  faCouch,
  faCamera,          // Rear View Camera
  faAutomobile
} from '@fortawesome/free-solid-svg-icons';

import { faBluetooth } from "@fortawesome/free-brands-svg-icons";

import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/zoom';



const TruckDetails = () => {
  const { id } = useParams();
  const [ truck, setTruck ] = useState( null );
  const { brands } = useCars();
  const [ properties, setProperties ] = useState( {} );
  const [ isMobile, setIsMobile ] = useState( true );
  const [ msg, setMsg ] = useState( "" );


  const PROPERTIES = useMemo( () => ( {
    "brand": "Marque",
    "certificate": "Certificat",
    "color": "Couleur",
    "due_date": "Uploaded Date",
    "emission": "Émission",
    "energy": "Énergie",
    "fuel_type": "Carburant",
    "gearbox": "Boîte de vitesses",
    "guarantee": "Garantie",
    "mileage": "Kilométrage",
    "model_year": "Modèle",
    "price_per_day": "Prix ​​par jour",
    "price_per_month": "Prix ​​par mois",
    "seating_capacity": "Nombre de places",
    "commercial_power": "Puissance commerciale",
    "fiscal_power": "Puissance fiscale",
    "co2_emission": "Émission de CO2",
    "mixed_consumption": "Consommation mixte",
    "body_type": "Carrosserie",
    "end_of_commercialization_date": "Date de fin"
  } ), [] );

  const ICONS_FOR_ACCESSORIES = useMemo( () => ( {
    "Climatiseur": faSnowflake,
    "Serrures de porte électriques": faLock,
    "Système de freinage antiblocage": faCar,
    "Assistance au freinage": faLifeRing,
    "Direction assistée": faCog,
    "Airbag conducteur": faUser,
    "Airbag passager": faUserFriends,
    "Vitres électriques": faWindowRestore,
    "Lecteur CD": faCompactDisc,
    "Verrouillage centralisé": faLockOpen,
    "Capteur de collision": faCarCrash,
    "Sièges en cuir": faCouch,
    "Bluetooth": faBluetooth,
    "Caméra de vision arrière": faCamera,
    "Automatique": faAutomobile
  } ), [] );

  useEffect( () => {
    console.log( id );
    const fetchCar = async () => {
      const res = await fetch( API.GET_TRUCK( id ) );
      if ( res.ok ) {
        const body = await res.json();
        console.log( body?.data[ 0 ] );

        if ( body?.data?.length ) body.data[ 0 ].brand = brands.find( brand => brand.id == body.data[ 0 ].brand )?.brandName;

        const { title, price_per_hour, price_per_week, price_on_weekend, overview, id, accessories, dimensions, weight, images, ...rest } = body.data[ 0 ];

        setProperties( rest );

        setTruck( body.data[ 0 ] );

        let msg = `
*Subject: Truck Rental Request*
Dear _WorldAuto!_ ,
I am interested in reserving the following truck and would like to provide the details:
        
- *ID* : ${ id }
- *Title* : ${ title }
- *Prix / heure* : ${ price_per_hour } €
- *Prix / semaine* : ${ price_per_week } €
- *Prix / weekend* : ${ price_on_weekend } €

`;

        accessories.forEach( ( v, i ) => {
          msg += `*${ i + 1 }.* ${ v }\n`;
        } );

        setMsg( msg );



      } else {
        console.error( 'Failed to fetch truck data' );
      }
    };

    if ( brands.length ) {
      fetchCar();
    }

  }, [ id, brands ] );

  useEffect( () => {

    const Resize = () => setIsMobile( window.innerWidth <= 768 );
    Resize();

    window.addEventListener( "resize", Resize );
  }, [] );

  if ( !truck || !brands.length ) {
    return <div>Loading...</div>;
  }

  return (
    <section id={ styles[ 'truck-details' ] }>
      { isMobile ? (
        <div className={ styles[ "img-carousal" ] }>
          <Swiper
            modules={ [ Navigation, Zoom, Pagination, Scrollbar, Keyboard, Mousewheel, Autoplay ] }
            navigation
            slidesPerView={ 'auto' }
            centeredSlides={ true }
            zoom
            pagination={ { clickable: true, type: "fraction" } }
            scrollbar={ { draggable: true } }
            autoplay={ !isMobile && { delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false } }
            spaceBetween={ 25 }
            // slidesPerView={ 1 }
            className={ styles[ 'img-carousal' ] }
          >
            { truck?.images.map( ( i, k ) => (
              <SwiperSlide zoom>
                <img className={ styles[ 'img' ] } src={ i } alt="" key={ k } />
              </SwiperSlide>
            ) ) }
          </Swiper>
        </div>
      ) : (
        <div className={ styles[ "row-1" ] }>
          <div className={ styles[ "img-carousal" ] }>
            <Swiper
              modules={ [ Navigation, Zoom, Pagination, Scrollbar, Keyboard, Mousewheel, Autoplay ] }
              navigation
              slidesPerView={ 'auto' }
              centeredSlides={ true }
              zoom
              pagination={ { clickable: true, type: "fraction" } }
              scrollbar={ { draggable: true } }
              autoplay={ !isMobile && { delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false } }
              spaceBetween={ 25 }
              // slidesPerView={ 1 }
              className={ styles[ 'img-carousal' ] }
            >
              { truck?.images.map( ( i, k ) => (
                <SwiperSlide zoom>
                  <img className={ styles[ 'img' ] } src={ i } alt="" key={ k } />
                </SwiperSlide>
              ) ) }
            </Swiper>
          </div>
          <div className={ styles[ "title-overview" ] }>
            <div className={ styles[ "title-price" ] }>
              <h1>{ truck.title }</h1>
              <div className={ styles[ "price-buy" ] }>
                { truck?.price_per_hour && <h1 className={ styles.hour }>{ truck.price_per_hour } €</h1> }
                { truck?.price_per_week && <h1 className={ styles.week }>{ truck.price_per_week } €</h1> }
                { truck?.price_on_weekend && <h1 className={ styles.weekend }>{ truck.price_on_weekend } €</h1> }
              </div>
            </div>
            <div className={ styles[ "overview" ] }>
              <h1 className={ styles[ 'title' ] }>Aperçu</h1>
              <p className={ styles[ "content" ] }>{ truck.overview }</p>
            </div>

            <a target='_blank' className={ styles[ 'reserve' ] } href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hey I contacted you through World Auto Site\n\n ${ msg } ` ) }` }>Enquire</a>
          </div >
        </div >
      ) }
      <div className={ styles[ "content" ] }>
        { isMobile && (
          <>
            <div className={ styles[ "title-price" ] }>
              <h1>{ truck.title }</h1>
              { truck?.price_per_hour && <h1 className={ styles.hour }>{ truck.price_per_hour } €</h1> }
              { truck?.price_per_week && <h1 className={ styles.week }>{ truck.price_per_week } €</h1> }
              { truck?.price_on_weekend && <h1 className={ styles.weekend }>{ truck.price_on_weekend } €</h1> }
            </div>
            <div className={ styles[ "overview" ] }>
              <h1 className={ styles[ 'title' ] }>Aperçu</h1>
              <p className={ styles[ "content" ] }>{ truck.overview }</p>
            </div>
            <a target='_blank' className={ styles[ 'reserve' ] } href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hey I contacted you through World Auto Site! \n\n ${ msg }` ) }` }>Enquire</a>
          </>
        ) }
        <div className={ styles[ "parent" ] }>
          <h1 className={ styles[ 'title' ] }>Détails</h1>
          <div className={ styles[ "details" ] }>
            { Object.entries( properties ).map( ( [ key, val ] ) => (
              <>
                { val?.toString().trim().length ? (
                  <div className={ styles[ "property" ] } key={ key } title={ val }>
                    <p className={ styles[ "key" ] }>{ PROPERTIES[ key ] }</p>
                    <p className={ styles[ "value" ] }>{ val }</p>
                  </div>
                ) : <></> }
              </>
            ) ) }
          </div>
        </div>
        <div className={ styles[ "parent" ] }>
          <h1 className={ styles[ 'title' ] }>Dimensions</h1>
          <div className={ styles[ "details" ] }>
            { Object.entries( truck?.dimensions ).map( ( [ key, val ] ) => (
              <div className={ styles[ "property" ] } key={ key } title={ val }>
                <p className={ styles[ "key" ] }>{ key }</p>
                <p className={ styles[ "value" ] }>{ val }</p>
              </div>
            ) ) }
          </div>
        </div>
        <div className={ styles[ "parent" ] }>
          <h1 className={ styles[ 'title' ] }>Weight</h1>
          <div className={ styles[ "details" ] }>
            { Object.entries( truck?.weight ).map( ( [ key, val ] ) => (
              <div className={ styles[ "property" ] } key={ key } title={ val }>
                <p className={ styles[ "key" ] }>{ key }</p>
                <p className={ styles[ "value" ] }>{ val }</p>
              </div>
            ) ) }
          </div>
        </div>
        <div className={ styles[ "parent" ] }>
          <h1 className={ styles[ 'title' ] }>Accessoires / fonctionnalités disponibles</h1>
          <div className={ styles[ "accessories" ] }>
            { truck?.accessories.map( ( val, i ) => (
              <div className={ styles[ "accessory" ] } key={ i } title={ val }>
                <FontAwesomeIcon className={ styles[ 'a-icon' ] } icon={ ICONS_FOR_ACCESSORIES[ val ] } />
                <p className={ styles[ "value" ] } >
                  { val }
                </p>
              </div>
            ) ) }
          </div>
        </div>
      </div>

    </section >
  );
};

export default TruckDetails;

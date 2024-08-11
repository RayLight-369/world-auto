import React, { useEffect, useMemo, useState } from 'react';
import styles from './CarDetails.module.css';
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



const CarDetails = () => {
  const { id } = useParams();
  const [ car, setCar ] = useState( null );
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
    "seating_capacity": "Nombre de places"
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
      const res = await fetch( API.GET_CAR( id ) );
      if ( res.ok ) {
        const body = await res.json();
        console.log( body?.data[ 0 ] );

        if ( body?.data?.length ) body.data[ 0 ].brand = brands.find( brand => brand.id == body.data[ 0 ].brand )?.brandName;

        const { title, price_per_day, price_per_month, overview, id, accessories, images, ...rest } = body.data[ 0 ];

        setProperties( rest );

        setCar( body.data[ 0 ] );

        let msg = `
*Subject: Car Reservation Request*
Dear _WorldAuto!_ ,
I am interested in reserving the following car and would like to provide the details:
        
- *ID* : ${ id }
- *Title* : ${ title }
- *Price* : ${ price_per_day } €

`;

        accessories.forEach( ( v, i ) => {
          msg += `*${ i + 1 }.* ${ v }\n`;
        } );

        setMsg( msg );



      } else {
        console.error( 'Failed to fetch car data' );
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

  if ( !car || !brands.length ) {
    return <div className={ styles[ 'loading-div' ] }>Loading...</div>;
  }

  return (
    <section id={ styles[ 'car-details' ] }>
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
            { car?.images.map( ( i, k ) => (
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
              { car?.images.map( ( i, k ) => (
                <SwiperSlide zoom>
                  <img className={ styles[ 'img' ] } src={ i } alt="" key={ k } />
                </SwiperSlide>
              ) ) }
            </Swiper>
          </div>
          <div className={ styles[ "title-overview" ] }>
            <div className={ styles[ "title-price" ] }>
              <h1>{ car.title }</h1>
              <div className={ styles[ "price-buy" ] }>
                <h1>{ car.price_per_day } €</h1>
              </div>
            </div>
            <div className={ styles[ "overview" ] }>
              <h1 className={ styles[ 'title' ] }>Aperçu</h1>
              <p className={ styles[ "content" ] }>{ car.overview }</p>
            </div>

            <a target='_blank' className={ styles[ 'reserve' ] } href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hey I contacted you through World Auto Site\n\n ${ msg } ` ) }` }>Enquire</a>
          </div >
        </div >
      ) }
      <div className={ styles[ "content" ] }>
        { isMobile && (
          <>
            <div className={ styles[ "title-price" ] }>
              <h1>{ car.title }</h1>
              <h1>{ car.price_per_day } €</h1>
            </div>
            <div className={ styles[ "overview" ] }>
              <h1 className={ styles[ 'title' ] }>Aperçu</h1>
              <p className={ styles[ "content" ] }>{ car.overview }</p>
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
          <h1 className={ styles[ 'title' ] }>Accessoires / fonctionnalités disponibles</h1>
          <div className={ styles[ "accessories" ] }>
            { car?.accessories.map( ( val, i ) => (
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

export default CarDetails;

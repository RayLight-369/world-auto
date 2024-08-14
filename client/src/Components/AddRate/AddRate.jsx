import React, { useState } from 'react';
import styles from "./AddRate.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useCars } from '../../Contexts/CarsContext';
import { API } from '../../Constants';


const AddRate = ( { handleClose, rate, type = 'new' } ) => {

  const [ title, setRateTitle ] = useState( rate?.title || "" );
  const [ price, setPrice ] = useState( rate?.price || 0 );
  // const [ Brand, setBrand ] = useState( rate );
  const [ adding, setAdding ] = useState( false );
  const { setRates, setCars } = useCars();

  const currentDate = new Date();
  const [ dateInput ] = useState( `${ currentDate.getFullYear() }-${ currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : "0" + ( currentDate.getMonth() + 1 ) }-${ currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate() }` );



  const buttonWhileHovering = ( scale = 1.1, duration = .1 ) => ( {
    scale,
    transition: {
      duration
    }
  } );

  // const inputWhileFocused = {
  //   scale: 1.06,
  // };

  async function addRate () {
    // navigateTo( session );
    if ( !title.trim().length && type != "del" ) return;

    const ReqData = { title, price };

    if ( type === "edit" || type == "del" ) ReqData.id = rate.id;

    try {

      setAdding( true );

      const res = await fetch( type == "edit" ? API.EDIT_RATE : type != "del" ? API.NEW_RATE : API.DEL_RATE, {
        method: type == "edit" ? "PUT" : type != "del" ? 'POST' : "DELETE",
        body: JSON.stringify( ReqData ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        console.log( body.data );

        if ( type === "edit" ) {

          setRates( prevRates =>
            prevRates.map( prevRate =>
              prevRate.id === body.data[ 0 ].id ? body.data[ 0 ] : prevRate
            )
          );

        } else if ( type === "del" ) {
          setRates( prev =>
            prev.filter( prevRate =>
              prevRate.id != ReqData.id
            )
          );
        } else {
          setRates( prev => [ body.data[ 0 ], ...prev ] );
        }

        handleClose();
      }

    } catch ( e ) {
      console.log( e );
    } finally {
      setAdding( false );
    }

  }

  return (
    <MotionConfig transition={ { type: "spring", damping: 7 } } >
      <div className={ styles[ "add-rate" ] }>
        <div className={ styles[ "header" ] }>
          <p className={ styles[ "title" ] }>{ type === "edit" ? "Modifier le tarif" : type != "del" ? "Ajouter un nouveau tarif" : "Es-tu sûr?" }</p>
          <motion.button type='button' whileHover={ buttonWhileHovering( 1.2, .2 ) } className={ styles[ 'close' ] } onClick={ handleClose }>✖</motion.button>
        </div>
        {
          type != "del" && (
            <div className={ styles[ "inputs" ] }>
              <input type="text" placeholder='Titre du taux' className={ styles[ "name" ] } value={ title } onChange={ e => setRateTitle( e.target.value ) } />
              <input type="text" placeholder='Prix' className={ styles[ "price" ] } value={ price } onChange={ e => setPrice( e.target.value ) } />
            </div>
          )
        }
        <div className={ styles[ "buttons" ] }>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "add-button" ] }
            onClick={ addRate }
            disabled={ adding }
          >
            { adding ? type == 'new' ? "Ajouter..." : type == "edit" ? "Mise à jour..." : "Suppression..." : type == 'new' ? "Ajouter" : type == "edit" ? "Mise à jour" : "Supprimer" }
          </motion.button>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "cancel-button" ] }
            onClick={ handleClose }
          >
            Annuler
          </motion.button>
        </div>
      </div>
    </MotionConfig>
  );
};

export default AddRate;
import React, { useState } from 'react';
import styles from "./AddBrand.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useCars } from '../../Contexts/CarsContext';
import { API } from '../../Constants';


const AddBrand = ( { handleClose, brand, type = 'new' } ) => {

  const [ brandName, setBrandName ] = useState( brand?.brandName || "" );
  // const [ Brand, setBrand ] = useState( brand );
  const [ adding, setAdding ] = useState( false );
  const { setBrands, setCars } = useCars();

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

  async function addBrand () {
    // navigateTo( session );
    if ( !brandName.trim().length && type != "del" ) return;

    const ReqData = { brandName, date_uploaded: dateInput };

    if ( type === "edit" || type == "del" ) ReqData.id = brand.id;

    try {

      setAdding( true );

      const res = await fetch( type == "edit" ? API.EDIT_BRAND : type != "del" ? API.NEW_BRAND : API.DEL_BRAND, {
        method: type == "edit" ? "PUT" : type != "del" ? 'POST' : "DELETE",
        body: JSON.stringify( { ReqData } ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        console.log( body.data );

        if ( type === "edit" ) {
          setBrands( prevBrands =>
            prevBrands.map( prevBrand =>
              prevBrand.id === body.data[ 0 ].id ? body.data[ 0 ] : prevBrand
            )
          );

          setCars( prevCars =>
            prevCars.map( prevCar => {
              if ( prevCar.brand == body.data[ 0 ].id ) prevCar.brand = body.data[ 0 ].id;
              return prevCar;
            } )
          );
        } else if ( type === "del" ) {
          setBrands( prev =>
            prev.filter( prevBrand =>
              prevBrand.id != body.data[ 0 ].id
            )
          );
        } else {
          setBrands( prev => [ body.data[ 0 ], ...prev ] );
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
      <div className={ styles[ "add-brand" ] }>
        <div className={ styles[ "header" ] }>
          <p className={ styles[ "title" ] }>{ type === "edit" ? "Edit Your Brand" : "Add New Brand" }</p>
          <motion.button type='button' whileHover={ buttonWhileHovering( 1.2, .2 ) } className={ styles[ 'close' ] } onClick={ handleClose }>✖</motion.button>
        </div>
        <div className={ styles[ "inputs" ] }>
          <input type="text" placeholder='Brand Name' className={ styles[ "name" ] } value={ brandName } onChange={ e => setBrandName( e.target.value ) } />
        </div>
        <div className={ styles[ "buttons" ] }>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "add-button" ] }
            onClick={ addBrand }
            disabled={ adding }
          >
            { adding ? type == 'new' ? "Adding..." : type != "edit" ? "Updating..." : "Deleting" : type == 'new' ? "Add" : type != "edit" ? "Update" : "Delete" }
          </motion.button>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "cancel-button" ] }
            onClick={ handleClose }
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </MotionConfig>
  );
};

export default AddBrand;
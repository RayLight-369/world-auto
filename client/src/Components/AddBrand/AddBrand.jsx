import React, { useState } from 'react';
import styles from "./AddBrand.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useCars } from '../../Contexts/CarsContext';


const AddBrand = ( { handleClose } ) => {

  const router = useRouter();
  const [ brandName, setBrandName ] = useState( "" );
  const [ adding, setAdding ] = useState( false );
  const { setBrands } = useCars();

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
    if ( !brandName.trim().length ) return;

    try {

      const res = await fetch( "https://world-auto-api.vercel.app/admin/brands", {
        method: 'POST',
        body: JSON.stringify( { brandName } ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        console.log( body.data );

        setBrands( prev => [ body.name, ...prev ] );

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
          <p className={ styles[ "title" ] }>Add New Brand</p>
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
            { adding ? "Adding..." : "Add" }
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
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import styles from "./DropDown.module.css";


const DropDown = ( { array = [], any = false, dropDownOpen, toggleDropDown, label, backWorkArray, setState, selected } ) => {

  const displayItems = useMemo( () => {
    let items = [ ...array ];
    if ( any && !items.includes( "Any" ) ) {
      items = [ "Any", ...items ];
    }
    return items;
  }, [ array, any ] );

  const valueItems = useMemo( () => {
    let vals = backWorkArray ? [ ...backWorkArray ] : [ ...array ];
    if ( any && vals[ 0 ] !== 1 ) {
      vals = [ 1, ...vals ];
    }
    return vals;
  }, [ backWorkArray, array, any ] );

  const [ Selected, setSelected ] = useState( "" );

  const variants = {
    open: { height: "auto", scale: 1, opacity: 1 },
    close: { height: "0", scale: 0.7, opacity: 0 }
  };

  // start selection when data arrives or selected prop changes
  useEffect( () => {
    if ( displayItems.length === 0 ) return;
    let idx = 0;

    if ( selected != null && selected !== "" ) {
      if ( backWorkArray ) {
        // when backWorkArray exists, selected could be either:
        // 1. a display name (string from array)
        // 2. a back value (number/string from backWorkArray)
        // Try matching against displayItems first, then valueItems
        let found = displayItems.indexOf( selected );
        if ( found !== -1 ) {
          idx = found;
        } else {
          // try matching against valueItems (IDs)
          const selectedNum = Number( selected );
          const valIndex = valueItems.findIndex( val =>
            val === selected || ( Number( val ) === selectedNum && !isNaN( selectedNum ) )
          );
          if ( valIndex !== -1 ) idx = valIndex;
        }
      } else {
        // match selected (brand name) against displayItems
        const found = displayItems.indexOf( selected );
        if ( found !== -1 ) idx = found;
      }
    }

    setSelected( displayItems[ idx ] );
    setState( valueItems[ idx ] );
  }, [ displayItems, valueItems, selected, setState, backWorkArray ] );

  // close dropdown when clicking outside
  useEffect( () => {
    const handler = e => {
      const select = document.querySelector( `div[name='${ label }']` );
      if ( select && !select.contains( e.target ) ) {
        toggleDropDown( false );
      }
    };
    document.addEventListener( 'click', handler );
    return () => document.removeEventListener( 'click', handler );
  }, [ label, toggleDropDown ] );

  const ToggleDropDown = ( e ) => {
    e.stopPropagation();
    toggleDropDown( prev => !prev );
  };
  const closeDropDown = () => toggleDropDown( false );


  return (
    <div className={ styles[ "dropdown-container" ] } key={ label } name={ label } onClick={ ToggleDropDown }>
      { label && <p className={ styles[ "label" ] }>{ label }</p> }
      {/* <div className={ styles[ 'content' ] }> */ }
      <div className={ styles[ 'parent' ] }>
        <div className={ styles[ 'select' ] } id={ label } >
          <p className={ styles[ "default-item" ] }>{ Selected }</p>
        </div>

        <AnimatePresence mode='wait'>
          { dropDownOpen && (
            <motion.div className={ styles[ "other-items" ] } variants={ variants } transition={ { duration: .15 } } animate="open" initial="close" exit="close" >
              { displayItems.map( ( item, i ) => {
                if ( item === Selected ) return null;
                return (
                  <button
                    type="button"
                    key={ i }
                    onClick={ e => {
                      e.stopPropagation();
                      setState( valueItems[ i ] );
                      setSelected( item );
                      closeDropDown();
                    } }
                  >
                    { item }
                  </button>
                );
              } ) }
            </motion.div>
          ) }
        </AnimatePresence>
      </div>
      {/* </div> */ }
    </div>
  );
};

export default DropDown;
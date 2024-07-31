import { memo, useCallback, useEffect, useRef, useState } from "react";

function PriceBox ( { id } ) {

  var [ prices, setPrices ] = useState( { startingPrice: 0, endingPrice: 0 } );

  var inputElement = useRef();

  const changeInputWidth = () => {
    let digits = inputElement.current.value.length;
    inputElement.current.style.width = `${ digits * 7.5 }px`;
  };

  const handleChange = useCallback( ( e ) => {

    if ( id === "starting" ) {
      setPrices( price => ( { ...price, startingPrice: +e.target.value } ) );
    } else {
      setPrices( price => ( { ...price, endingPrice: +e.target.value } ) );
    }

    // let digits = e.target.value.length;
    // e.target.style.width = `${digits * 7.5}px`;

  } );

  const handleDivClick = ( e ) => {
    e.preventDefault();
    if ( e.target === e.currentTarget ) {
      e.target.children[ 0 ].focus();
    }
  };

  const handleSlider = useCallback( e => {

    if ( id === "starting" ) {
      setPrices( prices => ( { ...prices, startingPrice: +e.target.value } ) );
    } else {
      setPrices( prices => ( { ...prices, endingPrice: +e.target.value } ) );
    }

  } );

  useEffect( () => {
    changeInputWidth();
  }, [ prices ] );

  return (
    <div className="_price_boxes_">
      <div className="price-box" id={ id } onClick={ handleDivClick }>
        <input type="number" ref={ inputElement } min='1' value={ id === "starting" ? prices.startingPrice : prices.endingPrice } onChange={ handleChange } /><span>$</span>
      </div>
      <input type="range" name="from" id="from" min={ 1 } max={ 50000 } onChange={ handleSlider } value={ id === "starting" ? prices.startingPrice : prices.endingPrice } />
    </div>
  );
}

export default memo( PriceBox );
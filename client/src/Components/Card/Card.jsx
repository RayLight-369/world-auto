import React, { memo } from 'react';
import Styles from "./Card.module.css";
import { Link } from 'react-router-dom';
import { formatNumber } from '../../Constants';

export const BreakSpan = memo( () => <span className={ Styles[ 'break' ] }>|</span> );

const Card = ( { ppd, ppm, ppw, ppwe, rent, title, color, emission, overview, year, manual, distance, fuel, guarantee, id, img, type = "car", sold = false } ) => {
  return (
    <div className={ `${ Styles[ "card" ] } ${ type === "rental-car" ? Styles.rental : "" }` }>
      { sold && <p className={ Styles[ "sold" ] }>Vendu</p> }
      <Link to={ `/${ type }/${ id }` }>
        <div className={ Styles[ "thumbnail" ] }>
          <img src={ img } className={ Styles[ type ] } alt="" />
          { type === "car" && (
            <div className={ Styles[ "price-notch" ] }>
              <p className={ Styles[ "price" ] }>€ { formatNumber( ppd ) }</p>
            </div>
          ) }
        </div>
        <div className={ Styles[ "infos" ] }>
          { type === "rental-car" && (
            <div className={ Styles[ "rental-price-block" ] }>
              <span className={ Styles[ "rental-ppd" ] }>
                €{ formatNumber( ppd ) }<small>/jour</small>
              </span>
              { ( ppw || ppwe ) && (
                <div className={ Styles[ "rental-secondary" ] }>
                  { ppw && <span>€{ formatNumber( ppw ) }/sem</span> }
                  { ppwe && <span>€{ formatNumber( ppwe ) }/we</span> }
                </div>
              ) }
            </div>
          ) }

          <p className={ Styles[ "title" ] }>{ title }</p>
          <p className={ Styles[ "version" ] }>{ overview }</p>
          <div className={ Styles[ "details" ] }>
            { year && (
              <>
                <p className={ Styles[ "year" ] }>{ year }</p>
                <BreakSpan />
              </>
            ) }
            { distance && (
              <>
                <p className={ Styles[ "distance" ] }>{ distance } km</p>
                <BreakSpan />
              </>
            ) }
            { fuel && (
              <>
                <p className={ Styles[ "fuel" ] }>{ fuel }</p>
                <BreakSpan />
              </>
            ) }
            { emission && (
              <>
                <p className={ Styles[ "emission" ] }>{ emission }</p>
                <BreakSpan />
              </>
            ) }
            { color && (
              <>
                <p className={ Styles[ "color" ] }>{ color }</p>
                <BreakSpan />
              </>
            ) }

            { manual && (
              <p className={ Styles[ "automatic" ] }>{ manual }</p>
            ) }
          </div>
          <div className={ Styles[ "card-footer" ] }>
            <div className={ Styles[ "guarantee" ] }>
              { guarantee && (
                <>
                  <img src="/Imgs/guarantee.svg" alt="" />
                  <p>{ guarantee }</p>
                </>
              ) }
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
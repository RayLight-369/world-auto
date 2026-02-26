import React, { memo } from 'react';
import Styles from "./Card.module.css";
import { Link } from 'react-router-dom';
import { formatNumber } from '../../Constants';

export const BreakSpan = memo( () => <span className={ Styles[ 'break' ] }>|</span> );

const Card = ( { ppd, ppm, ppw, ppwe, rent, title, overview, year, manual, distance, fuel, guarantee, id, img, type = "car", sold = false } ) => {
  return (
    <div className={ Styles[ "card" ] }>
      { sold && <p className={ Styles[ "sold" ] }>Vendu</p> }
      <Link to={ `/${ type }/${ id }` }>
        <div className={ Styles[ "thumbnail" ] }>
          <img src={ img } className={ Styles[ type ] } alt="" />
          { type == "car" || type == "rental-car" ?
            <div className={ Styles[ "price-notch" ] }>
              <div className={ !rent ? Styles[ "price-wrapper" ] : Styles[ "rent-prices-wrapper" ] }>
                {
                  !rent ?
                    <p className={ Styles[ "price" ] }>€ { formatNumber( ppd ) }</p>
                    :
                    <div className={ Styles[ "rent-prices-grid" ] }>
                      { ppd && <div className={ Styles[ "price-badge" ] }><span className={ Styles[ "price-value" ] }>€{ ppd }</span><span className={ Styles[ "price-period" ] }>jour</span></div> }
                      { ppw && <div className={ Styles[ "price-badge" ] }><span className={ Styles[ "price-value" ] }>€{ ppw }</span><span className={ Styles[ "price-period" ] }>semaine</span></div> }
                      { ppwe && <div className={ Styles[ "price-badge" ] }><span className={ Styles[ "price-value" ] }>€{ ppwe }</span><span className={ Styles[ "price-period" ] }>weekend</span></div> }
                    </div>
                }
              </div>
            </div>
            : <></>
          }

        </div>
        <div className={ Styles[ "infos" ] }>
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

            { manual != undefined && (
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
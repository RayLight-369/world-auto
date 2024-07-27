import React, { memo } from 'react';
import Styles from "./Card.module.css";

export const BreakSpan = memo( () => <span className={ Styles[ 'break' ] }>|</span> );

const Card = ( { ppd, ppm, title, overview, year, manual, distance, fuel, guarantee } ) => {
  return (
    <div className={ Styles[ "card" ] }>
      <a href="">
        <div className={ Styles[ "thumbnail" ] }>
          <img src="/Imgs/ad.jpg" alt="" />
          <div className={ Styles[ "price-notch" ] }>
            <p className={ Styles[ "price" ] }>{ ppd } USD</p>
            <p className={ Styles[ "monthly" ] }>That's { ppm } USD/month</p>
          </div>

        </div>
        <div className={ Styles[ "infos" ] }>
          <p className={ Styles[ "title" ] }>{ title }</p>
          <p className={ Styles[ "version" ] }>{ overview }</p>
          <div className={ Styles[ "details" ] }>
            <p className={ Styles[ "year" ] }>{ year }</p>
            <BreakSpan />
            <p className={ Styles[ "distance" ] }>{ distance } km</p>
            <BreakSpan />
            <p className={ Styles[ "fuel" ] }>{ fuel }</p>
            <BreakSpan />
            <p className={ Styles[ "automatic" ] }>{ manual ? "Manual" : "Automatic" }</p>
          </div>
          <div className={ Styles[ "card-footer" ] }>
            <div className={ Styles[ "guarantee" ] }>
              <img src="/Imgs/guarantee.svg" alt="" />
              <p>{ guarantee }</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
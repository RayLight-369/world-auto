import React, { memo } from 'react';
import Styles from "./Card.module.css";

const BreakSpan = memo( () => <span className={ Styles[ 'break' ] }>|</span> );

const Card = () => {
  return (
    <div className={ Styles[ "card" ] }>
      <a href="">
        <div className={ Styles[ "thumbnail" ] }>
          <img src="/Imgs/ad.jpg" alt="" />
          <div className={ Styles[ "price-notch" ] }>
            <p className={ Styles[ "price" ] }>$120</p>
            <p className={ Styles[ "monthly" ] }>That's $145/month</p>
          </div>

        </div>
        <div className={ Styles[ "infos" ] }>
          <p className={ Styles[ "title" ] }>RENAULT - MEGANE III BERLINE BUSINESS</p>
          <p className={ Styles[ "version" ] }>Mégane III dCi 110 Business EDC E6</p>
          <div className={ Styles[ "details" ] }>
            <p className={ Styles[ "year" ] }>2015</p>
            <BreakSpan />
            <p className={ Styles[ "distance" ] }>148,800 km</p>
            <BreakSpan />
            <p className={ Styles[ "fuel" ] }>Diesel</p>
            <BreakSpan />
            <p className={ Styles[ "automatic" ] }>Automatic</p>
          </div>
          <div className={ Styles[ "card-footer" ] }>
            <div className={ Styles[ "guarantee" ] }>
              <img src="/Imgs/guarantee.svg" alt="" />
              <p>6 Months Warranty</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
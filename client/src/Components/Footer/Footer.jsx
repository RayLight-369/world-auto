import React from 'react';
import styles from './Footer.module.css';
import { NavLinks } from '../../Constants';
// import logo from './logo.png'; // Make sure you have a logo.png file in the same directory/

const Footer = () => {
  return (
    <footer className={ styles.footer }>
      {/* <div className={ styles.logoContainer }>
        <img src={ "/Imgs/worldauto.jpg" } alt="Logo" className={ styles.logo } />
      </div> */}
      <ul className={ styles.links }>
        { NavLinks.map( ( link, key ) => (
          <li key={ key }>
            <a href={ link.path }>{ link.name }</a>
          </li>
        ) ) }
      </ul>
      <p className={ styles.copyright }>
        © 2024 World Auto. All rights reserved.
      </p>
      <p className={ styles.poweredBy }>
        Powered by <a href="https://itc.aions.co" target="_blank">Aions</a>
      </p>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import Styles from "./Header.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { NavLinks } from '../../Constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

  const [ toggleDropdown, setToggleDropdown ] = useState( false );
  const [ icon, setIcon ] = useState( faBars );
  const [ isMobile, setIsMobile ] = useState( false );

  useEffect( () => {

    const Resize = () => setIsMobile( window.innerWidth <= 768 );
    window.addEventListener( "resize", Resize );

    Resize();

  }, [] );

  return (
    <>
      <header className={ Styles[ "header" ] }>
        <nav className={ Styles[ 'navbar' ] }>
          <div className={ Styles[ "logo" ] }>
            <NavLink to={ "/" }>
              <img height={ "22px" } src="/Imgs/worldauto.jpg" alt="World Auto logo" />
            </NavLink>
          </div>
          <div className={ Styles[ "nav-links" ] }>
            { NavLinks.map( ( route ) => (
              <NavLink to={ route.path } key={ route.path }>{ route.name }</NavLink>
            ) ) }
          </div>
          <div className={ Styles[ "user-info" ] }>
            <NavLink to={ "tel:+33186950414" } className={ Styles[ "tel" ] }>01 86 95 04 14</NavLink>
            <NavLink to={ "/" } id={ Styles[ 'reg-btn' ] } className={ Styles[ "register" ] }>Sign up</NavLink>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
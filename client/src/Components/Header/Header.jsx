import React from 'react';
import Styles from "./Header.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { NavLinks } from '../../Constants';

const Header = () => {
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
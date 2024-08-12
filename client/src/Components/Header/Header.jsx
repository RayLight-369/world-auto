import React, { memo, useEffect, useMemo, useState } from 'react';
import Styles from "./Header.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { NavLinks } from '../../Constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
// import { GoogleLogin, googleLogout, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useUser } from '../../Contexts/SessionUserContext';
import Footer from '../Footer/Footer';


const Header = () => {

  const [ toggleDropdown, setToggleDropdown ] = useState( false );
  const [ icon, setIcon ] = useState( faBars );
  const [ mobile, setMobile ] = useState( true );
  const isMobile = useMemo( () => window.innerWidth <= 1200, [ mobile ] );
  const { user, Login, isLoggedIn, Logout } = useUser();

  // const hideDropdown = () => {
  //   setToggleDropdown( false );
  //   setIcon( faBars );
  // };




  useEffect( () => {

    const Resize = () => setMobile( window.innerWidth <= 768 );
    window.addEventListener( "resize", Resize );

    Resize();

    return () => window.removeEventListener( "resize", Resize );

  }, [] );

  let content;

  if ( !isMobile ) {

    content =
      <>
        <div className={ Styles[ "nav-links" ] }>
          { NavLinks.map( ( route ) => (
            <NavLink to={ route.path } key={ route.path } className={ ( { isActive } ) => isActive ? Styles.active : "" }>{ route.name }</NavLink>
          ) ) }
        </div>
        <div className={ Styles[ "user-info" ] }>
          <NavLink to={ "tel:+33186950414" } className={ Styles[ "tel" ] }>01 86 95 04 14</NavLink>

          { !isLoggedIn ? (
            <button id={ Styles[ 'reg-btn' ] } onClick={ Login } className={ Styles[ "register" ] }>Me Connecter</button>
          ) : (
            <>
              <img src={ user?.image } alt="" className={ Styles[ 'pfp' ] } onClick={ () => setToggleDropdown( prev => !prev ) } />
              <div className={ `${ Styles[ "menu" ] } ${ toggleDropdown && Styles[ "open" ] }` }>

                <button id={ Styles[ 'reg-btn' ] } onClick={ Logout } className={ Styles[ "register" ] }>Me Déconnecter</button>
              </div>
            </>
          ) }
        </div>
      </>;

  } else {

    content = (
      <div className={ Styles[ "menu-bar" ] }>
        <div className={ Styles[ "bars" ] }>
          <FontAwesomeIcon
            icon={ icon }
            onClick={ () =>
              setToggleDropdown( ( prev ) => {
                if ( !prev ) setIcon( faBarsStaggered );
                else setIcon( faBars );
                return !prev;
              } )
            }
            style={ {
              color: "var(--soft-blue)",
            } }
          />
        </div>
        {/* {toggleDropdown && ( */ }
        <div
          className={ `${ Styles.dropdown } ${ toggleDropdown ? Styles.open : "" }` }
        >
          <div className={ Styles[ "links" ] }>
            {/* <NavLink to={ "/" } className={ ( { isActive } ) => isActive ? Styles.active : "" }>Home</NavLink>
            <NavLink to={ "/about" } className={ ( { isActive } ) => isActive ? Styles.active : "" }>About</NavLink>
            <NavLink to={ "/contact" } className={ ( { isActive } ) => isActive ? Styles.active : "" }>Contact</NavLink> */}
            { NavLinks.map( ( route ) => (
              <NavLink to={ route.path } key={ route.path } className={ ( { isActive } ) => isActive ? Styles.active : "" }>{ route.name }</NavLink>
            ) ) }
            {/* { isLoggedIn && (
              <>
                <NavLink
                  to={ "/create-post" }
                  className={ setActiveLink( "/create-post" ) }
                // onClick={hideDropdown}
                >
                  Create Post
                </NavLink>
                <NavLink
                  href={ `/users/${ session?.user.id }/posts` }
                  className={ setActiveLink( `/users/${ session?.user.id }/posts` ) }
                // onClick={hideDropdown}
                >
                  My Posts
                </NavLink>
                <NavLink
                  href={ `/users/${ session?.user.id }` }
                  className={ setActiveLink( `/users/${ session?.user.id }` ) }
                // onClick={hideDropdown}
                >
                  Profile
                </NavLink>
              </>
            ) } */}
          </div>
          { user ? (
            <button
              className={ Styles.signout }
              onClick={ () => {
                // hideDropdown();
                Logout();
              } }
            >
              Sign-out
            </button>
          ) : (
            <button
              className={ Styles[ "register-btn" ] }
              onClick={ () => {
                // hideDropdown();
                Login();
              } }
            >
              Sign-in
            </button>
          ) }
        </div>
        {/* )} */ }
      </div>
    );

  }

  return (
    <>
      <header className={ Styles[ "header" ] }>
        <nav className={ Styles[ 'navbar' ] }>
          <div className={ Styles[ "logo" ] }>
            <NavLink to={ "/" }>
              <img height={ "22px" } src="/Imgs/worldauto.jpg" alt="World Auto logo" />
            </NavLink>
          </div>
          { content }
        </nav>
      </header>
      <Outlet />
      <Footer />
    </>
  );
};

export default memo( Header );
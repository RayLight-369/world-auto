import React, { useEffect, useMemo, useState } from 'react';
import Styles from "./Admin.module.css";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from 'framer-motion';
import OptionBar from "../../Components/OptionBar/OptionBar";
import AddCar from '../../Components/AddCar/AddCar';
import Modal from '../../Components/Modal/Modal';
import AddBrand from '../../Components/AddBrand/AddBrand';
import { AdminLinks } from '../../Constants';

const Admin = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [ openAddCarPopup, setAddCarPopup ] = useState( false );
  const [ openAddBrandPopup, setAddBrandPopup ] = useState( false );

  const [ isMobile, setIsMobile ] = useState( false );

  // const links = useMemo( () => ( [
  //   {
  //     title: "Dashboard",
  //     link: "/admin/dashboard"
  //   },
  //   {
  //     title: "Add New Car",
  //     link: "/admin/new-car"
  //   }
  // ] ), [] );

  useEffect( () => {
    if ( [ "/admin", "/admin/", "admin" ].includes( location.pathname ) ) {
      navigate( "/admin/dashboard" );
    }

    const Resize = () => setIsMobile( window.innerWidth <= 768 );
    Resize();

    window.addEventListener( 'resize', Resize );

  }, [] );

  const closePopUp = ( setState ) => setState( false );

  return (
    <section id={ Styles[ "admin" ] }>
      <header id={ Styles[ 'header' ] }>
        <div className={ Styles[ "logo" ] }>
          <img src="/Imgs/worldauto.jpg" alt="" />
        </div>
        <nav id={ Styles[ 'nav' ] }>
          { AdminLinks.map( ( route => (
            <NavLink className={ ( { isActive } ) =>
              isActive ? `${ Styles.active }` : undefined
            } to={ route.path }>{ !isMobile ? route.name : route[ "name" ].split( " " )[ 1 ] || route[ "name" ] }</NavLink>
          ) ) ) }
        </nav>
      </header>

      <section id={ Styles[ "content" ] }>
        {/* <MotionConfig transition={ {
          type: "spring",
          damping: 14
        } }> */}
        <AnimatePresence mode='wait'>
          <Outlet key={ location.pathname } />
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          <OptionBar setAddBrandPopupOpen={ setAddBrandPopup } setAddCarPopupOpen={ setAddCarPopup } />
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          { openAddCarPopup && (
            <Modal handleClose={ () => closePopUp( setAddCarPopup ) }>
              <AddCar handleClose={ () => closePopUp( setAddCarPopup ) } />
            </Modal>
          ) }
          { openAddBrandPopup && (
            <Modal handleClose={ () => closePopUp( setAddBrandPopup ) }>
              <AddBrand handleClose={ () => closePopUp( setAddBrandPopup ) } />
            </Modal>
          ) }
        </AnimatePresence>
        {/* </MotionConfig> */ }
      </section>
    </section>
  );
};

export default Admin;
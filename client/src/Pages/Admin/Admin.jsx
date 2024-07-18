import React, { useEffect, useMemo } from 'react';
import Styles from "./Admin.module.css";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

const Admin = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const links = useMemo( () => ( [
    {
      title: "Dashboard",
      link: "/admin/dashboard"
    },
    {
      title: "Add New Car",
      link: "/admin/new-car"
    }
  ] ), [] );

  useEffect( () => {
    if ( [ "/admin", "/admin/", "admin" ].includes( location.pathname ) ) {
      navigate( "/admin/dashboard" );
    }
  }, [] );

  return (
    <section id={ Styles[ "admin" ] }>
      <header id={ Styles[ 'header' ] }>
        <div className={ Styles[ "logo" ] }>
          <img src="/Imgs/worldauto.jpg" alt="" />
        </div>
        <nav id={ Styles[ 'nav' ] }>
          { links.map( ( route => (
            <NavLink className={ ( { isActive } ) =>
              isActive ? `${ Styles.active }` : undefined
            } to={ route.link }>{ route.title }</NavLink>
          ) ) ) }
        </nav>
      </header>

      <section id={ Styles[ "content" ] }>
        <AnimatePresence mode='wait'>
          <Outlet key={ location.pathname } />

        </AnimatePresence>
      </section>
    </section>
  );
};

export default Admin;
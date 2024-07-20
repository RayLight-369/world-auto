import React from 'react';
import Styles from "./Dashboard.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className={ Styles[ "container" ] }>
      <PageTitle className={ Styles[ "page-title" ] } title={ "Dashboard" } />
      <div className={ Styles[ "page-content" ] }>
        <div className={ Styles[ "details-container" ] }>
          <Link to={ "/admin/cars" }>
            <div className={ `${ Styles[ "cars" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Cars</p>
              <p className={ Styles[ "desc" ] }>Check Your Cars Here</p>
            </div>
          </Link>

          <Link to={ "/admin/brands" }>
            <div className={ `${ Styles[ "brands" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Brands</p>
              <p className={ Styles[ "desc" ] }>Check Your Brands Here</p>
            </div>
          </Link>
        </div>
        <div className={ Styles[ "recent-updates-container" ] }>
          <div className={ `${ Styles[ "recent-cars" ] } ${ Styles[ "container" ] }` }>
            <p className={ Styles[ "title" ] }>Recently Added Cars</p>
          </div>
          <div className={ `${ Styles[ "recent-brands" ] } ${ Styles[ "container" ] }` }>
            <p className={ Styles[ "title" ] }>Recently Added Cars</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import Styles from "./Dashboard.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { useCars } from "../../Contexts/CarsContext";

const Dashboard = () => {

  const { cars, brands } = useCars();

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
            <div className={ Styles[ "list" ] }>
              { cars.length ? cars.map( ( car, i ) => (
                <div className={ Styles[ "car" ] } key={ i }>
                  <div className={ Styles[ "content" ] }>
                    <div className={ Styles[ "brand-title" ] }>
                      <p className={ Styles[ "car-title" ] }>{ car.title }</p>
                      <p className={ Styles[ "car-brand" ] }>{ car.brand }</p>
                    </div>
                    <p className={ Styles[ "date" ] }>{ car.due_date }</p>
                  </div>
                </div>
              ) ) : (
                <p className={ Styles[ 'no-recent-note' ] }>No Cars Added!</p>
              ) }
            </div>
          </div>
          <div className={ `${ Styles[ "recent-brands" ] } ${ Styles[ "container" ] }` }>
            <p className={ Styles[ "title" ] }>Recently Added Cars</p>
            <div className={ Styles[ "list" ] }>
              { brands.length ? brands.map( ( brand, i ) => (
                <div className={ Styles[ "brand" ] } key={ i }>
                  <div className={ Styles[ "content" ] }>
                    <p className={ Styles[ "brand-title" ] }>{ brand.brandName }</p>
                    <p className={ Styles[ "date" ] }>{ brand.date_uploaded }</p>
                  </div>
                </div>
              ) ) : (
                <p className={ Styles[ 'no-recent-note' ] }>No Brands Added!</p>
              ) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
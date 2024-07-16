import React from 'react';
import Styles from "./NewCar.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';

const NewCar = () => {
  return (
    <div className={ Styles[ "container" ] }>
      <PageTitle className={ Styles[ "page-title" ] } title={ "Add New Car" } />
      <div className={ Styles[ "page-content" ] }>

      </div>
    </div>
  );
};

export default NewCar;
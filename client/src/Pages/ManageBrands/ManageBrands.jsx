import React from 'react';
import Styles from "./ManageBrands.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';

const ManageBrands = () => {
  return (
    <div className={ Styles[ "container" ] }>
      <PageTitle className={ Styles[ "page-title" ] } title={ "Manage Brands" } />
      <div className={ Styles[ "page-content" ] }>

      </div>
    </div>
  );
};

export default ManageBrands;
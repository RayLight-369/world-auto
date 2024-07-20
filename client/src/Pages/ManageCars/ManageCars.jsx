import React from 'react';
import Styles from "./ManageCars.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';

const ManageCars = () => {
  return (
    <div className={ Styles[ "container" ] }>
      <PageTitle className={ Styles[ "page-title" ] } title={ "Manage Cars" } />
      <div className={ Styles[ "page-content" ] }>

      </div>
    </div>
  );
};

export default ManageCars;
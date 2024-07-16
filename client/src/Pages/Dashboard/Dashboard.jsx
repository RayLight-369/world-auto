import React from 'react';
import Styles from "./Dashboard.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';

const Dashboard = () => {
  return (
    <div className={ Styles[ "container" ] }>
      <PageTitle className={ Styles[ "page-title" ] } title={ "Dashboard" } />
      <div className={ Styles[ "page-content" ] }>

      </div>
    </div>
  );
};

export default Dashboard;
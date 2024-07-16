import React from 'react';
import Styles from "./PageTitle.module.css";

const PageTitle = ( { title, className } ) => {
  return (
    <h1 className={ `${ Styles[ 'page-title' ] } ${ className }` }>{ title }</h1>
  );
};

export default PageTitle;
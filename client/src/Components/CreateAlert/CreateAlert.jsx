import React from 'react';
import Styles from "./CreateAlert.module.css";

const CreateAlert = () => {
  return (
    <div className={ Styles[ "card" ] }>
      <p className={ Styles[ "title" ] }>
        Haven't found what you are looking for?
      </p>
      <button className={ Styles[ "create" ] }>
        Create Alert
      </button>
      <p className={ Styles[ "footer" ] }>
        Receive by email the ads that match your search criteria
      </p>
    </div>
  );
};

export default CreateAlert;
import React, { useState } from "react";
import Styles from "./RequestForm.module.css";
import { motion } from "framer-motion";
import { CREDENTIALS } from "../../Constants";

const RequestForm = ( { handleSubmit } ) => {
  const handleMsgChange = ( e ) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className={ Styles.container }>
      <div className={ Styles.inputs }>
        <div className={ Styles[ "shows-request" ] }>
          <label htmlFor={ Styles[ "shows-request-label" ] }>
            <input
              placeholder=" "
              type="text"
              id={ Styles[ "shows-request-input" ] }
              name={ Styles[ "shows-request-input" ] }
            />
            <span>Your Email</span>
          </label>
        </div>
        <div className={ Styles[ "shows-message" ] }>
          <label htmlFor={ Styles[ "shows-message-label" ] }>
            <textarea
              placeholder=" "
              id={ Styles[ "shows-message-input" ] }
              onChange={ handleMsgChange }
              name={ Styles[ "shows-message-input" ] }
            />
            <span>Message (Optional)</span>
          </label>
        </div>
      </div>
      <div className={ Styles.buttons }>
        <button
          type="button"
          className={ Styles.requestBtn }
          onClick={ handleSubmit }
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default RequestForm;

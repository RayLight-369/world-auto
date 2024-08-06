// import React, { useState } from "react";
import { useState } from "react";
import Styles from "./RequestForm.module.css";
// import { motion } from "framer-motion";
// import { CREDENTIALS } from "../../Constants";

const RequestForm = ( { handleSubmit } ) => {

  const [ email, setEmail ] = useState( "" );
  const [ msg, setMsg ] = useState( "" );

  const handleMsgChange = ( e ) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    setMsg( e.target.value );
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
              onChange={ e => setEmail( e.target.value ) }
              value={ email }
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
              value={ msg }
            />
            <span>Message (Optional)</span>
          </label>
        </div>
      </div>
      <div className={ Styles.buttons }>
        <a
          // type="a"
          className={ Styles.requestBtn }
          // href={ `mailto:${ "worlauto95530@gmail.com" }?subject=Hey I Contacted You Through WorldAuto Site&body=${ msg }` }
          href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hey I Contacted You Through WorldAuto Site! My Email is ${ email }\n${ msg }` ) }` }
          target="_blank"
        // onClick={ handleSubmit }
        >
          Send Message
        </a>
      </div>
    </div>
  );
};

export default RequestForm;

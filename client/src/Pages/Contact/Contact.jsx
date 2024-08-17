import { useMemo } from "react";
import Styles from "./Contact.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import RequestForm from "../../Components/RequestForm/RequestForm";
import { faLocationDot, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { API } from "../../Constants";


const Contact = () => {

  const variants = {
    hidden: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 5
    }
  };


  const handleFormSubmit = async () => {

    try {

      // const res = await fetch( API.CONTACT_EMAIL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify( {
      //     email: "abdulrafay.designs@gmail.com"
      //   } )
      // } );

      // console.log( await res.json() );

    } catch ( e ) {
      console.log( e );
    }

  };

  return (
    // <AnimatePresence mode="wait">
    <motion.section id={ Styles[ "contact" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.div className={ Styles[ "banner" ] } variants={ variants }>
        <h1 className={ Styles[ "title" ] }>Contactez-nous</h1>
        <p className={ Styles[ "desc" ] }>Entrer en contact</p>
        <div className={ Styles[ "social" ] }>
          <a href="https://www.facebook.com/worldautopro1?locale=fr_FR"><FontAwesomeIcon icon={ faFacebook } /></a>
          <a href="https://www.instagram.com/worldauto_idf/"><FontAwesomeIcon icon={ faInstagram } /></a>
          <a href="https://www.tiktok.com/@world.auto.idf?is_from_webapp=1&sender_device=pc"><FontAwesomeIcon icon={ faTiktok } /></a>
        </div>
      </motion.div>
      <motion.div className={ Styles[ "info" ] } variants={ variants }>
        <div className={ Styles[ "panel" ] }>
          <h1>Fier de vous offrir le meilleur rapport <span>qualité/prix du marché</span></h1>
          <div className={ Styles[ "social-attrs" ] }>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faMailBulk } />
              <p>worldauto95530@gmail.com</p>
            </div>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faPhone } />
              <p>+33 7 51 28 73 93</p>
            </div>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faLocationDot } />
              <p>Enghein les Bains 95880 - Paris - France</p>
            </div>
          </div>
        </div>
        <RequestForm handleSubmit={ handleFormSubmit } />
      </motion.div>

    </motion.section>
    // </AnimatePresence>
  );
};

export default Contact;
import { memo, useEffect, useMemo } from "react";
import Styles from "./Contact.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLetterboxd, faMailchimp, faSquareLetterboxd, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import RequestForm from "../../Components/RequestForm/RequestForm";
import { faLocation, faLocationDot, faLocationPin, faMailBulk, faMapLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";



const Star = ( { n } ) => {

  return (
    <div className={ Styles[ "stars" ] }>
      { Array.from( { length: n } ).map( ( _, i ) => (
        <img key={ i } src="/Imgs/star.svg" alt="star" className={ Styles[ "starImage" ] } />
      ) ) }
    </div>
  );

};

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

  const reviews = useMemo( () =>
    [
      {
        from: "KEBIR DGAYGUI",
        msg: "I had the pleasure of meeting Brendon who was punctual, honest and kind. A car purchase carried out with professionalism is rare in used car sales.",
        stars: 5,
        link: "https://g.co/kgs/g5kmAo2"
      },
      {
        from: "Arnaud Remy",
        msg: "Serious seller and concerned that everything goes well. I recommend without reservation. Good luck in continuing your business",
        stars: 5,
        link: "https://g.co/kgs/M3s94WM"
      },
      {
        from: "Samuel Melerio",
        msg: "Efficient and responsive! Brendon was able to reassure us and support us during this purchase",
        stars: 5,
        link: "https://g.co/kgs/EQTV8Ts"
      },
      {
        from: "Kikabou Jessy",
        msg: "It's serious, it's honest, it's a good opportunity not to be missed.",
        stars: 5,
        link: "https://g.co/kgs/ZQrHeLh"
      },
      {
        from: "Junior Ndiaye",
        msg: "Very professional and honest. Vehicle without any problems after several weeks of use.",
        stars: 5,
        link: "https://g.co/kgs/73MHy8V"
      },
      {
        from: "Nicolas GARNIER",
        msg: "I recently bought a vehicle, it runs impeccably well. They are very accommodating and professional. I highly recommend!!",
        stars: 5,
        link: "https://g.co/kgs/sCB8T26"
      },
    ], [] );

  return (
    // <AnimatePresence mode="wait">
    <motion.section id={ Styles[ "contact" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.div className={ Styles[ "banner" ] } variants={ variants }>
        <h1 className={ Styles[ "title" ] }>Contact Us</h1>
        <p className={ Styles[ "desc" ] }>Get in Touch</p>
        <div className={ Styles[ "social" ] }>
          <a href="https://www.facebook.com/worldautopro1?locale=fr_FR"><FontAwesomeIcon icon={ faFacebook } /></a>
          <a href="https://www.instagram.com/worldauto_idf/"><FontAwesomeIcon icon={ faInstagram } /></a>
          <a href="https://www.tiktok.com/@world.auto.idf?is_from_webapp=1&sender_device=pc"><FontAwesomeIcon icon={ faTiktok } /></a>
        </div>
      </motion.div>
      <motion.div className={ Styles[ "info" ] } variants={ variants }>
        <div className={ Styles[ "panel" ] }>
          <h1>Let's explore something <span>exciting</span> together!</h1>
          <div className={ Styles[ "social-attrs" ] }>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faMailBulk } />
              <p>worlauto95530@gmail.com</p>
            </div>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faPhone } />
              <p>+33 7 51 28 73 93</p>
            </div>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faMailBulk } />
              <p>worlauto95530@gmail.com</p>
            </div>
            <div className={ Styles[ "attr" ] }>
              <FontAwesomeIcon icon={ faLocationDot } />
              <p>Enghein les Bains 95880 - Paris - France</p>
            </div>
          </div>
        </div>
        <RequestForm />
      </motion.div>

    </motion.section>
    // </AnimatePresence>
  );
};

export default Contact;
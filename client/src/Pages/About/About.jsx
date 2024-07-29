import { memo, useEffect, useMemo } from "react";
import Styles from "./About.module.css";
import { AnimatePresence, motion } from "framer-motion";



const Star = ( { n } ) => {

  return (
    <div className={ Styles[ "stars" ] }>
      { Array.from( { length: n } ).map( ( _, i ) => (
        <img key={ i } src="/Imgs/star.svg" alt="star" className={ Styles[ "starImage" ] } />
      ) ) }
    </div>
  );

};

const About = () => {

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
    <motion.section id={ Styles[ "about" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.div className={ Styles[ "banner" ] } variants={ variants }>
        <h1 className={ Styles[ "title" ] }>About Us</h1>
        <p className={ Styles[ "desc" ] }>Discover Our Story</p>
      </motion.div>
      <motion.div className={ Styles[ "info" ] } variants={ variants }>
        <div className={ Styles[ "img" ] } />
        <p className={ Styles[ "description" ] }>
          Passionné d'automobile depuis mon plus jeune âge, j'ai débuté ma carrière professionnelle à 16 ans alors que j'étudiais pour mon Bac professionnel en commerce. Parallèlement, j'ai travaillé comme apprenti dans une entreprise de vente de pièces détachées. Cette expérience m'a permis de m'immerger dans l'industrie et j'ai développé une profonde passion pour l'automobile en livrant des pièces à des concessionnaires de voitures de luxe tels que Porsche, Maserati et d'autres prestigieux.
          J'ai poursuivi mon parcours en poursuivant des études supérieures en Management Opérationnel Commercial. À la fin de mes études, j'ai décidé de me lancer dans une carrière professionnelle et j’ai donc crée World Auto.

        </p>
      </motion.div>
      <motion.div className={ Styles[ "reviews" ] } variants={ variants }>
        <h1>Reviews From Google</h1>
        <div className={ Styles[ "reviews-container" ] }>
          { reviews.map( ( review, i ) => (
            <a href={ review.link }>
              <div className={ Styles[ "review" ] } key={ i }>
                <p className={ Styles[ "name" ] }>{ review.from }</p>
                <Star n={ review.stars } />
                <p className={ Styles[ "msg" ] }>{ review.msg }</p>
              </div>
            </a>
          ) ) }
        </div>
      </motion.div>

    </motion.section>
    // </AnimatePresence>
  );
};

export default About;
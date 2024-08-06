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
        msg: "J'ai eu le plaisir de rencontrer Brendon qui a fait preuve de ponctualité, d'honnêteté et de gentillesse. Un achat de voiture mené avec professionnalisme, c'est rare dans la vente de voiture d'occasion.",
        stars: 5,
        link: "https://g.co/kgs/g5kmAo2"
      },
      {
        from: "Arnaud Remy",
        msg: "Vendeur sérieux et soucieux que tout se passe pour le mieux. Je recommande sans réserve. Bonne chance dans la poursuite de votre activité",
        stars: 5,
        link: "https://g.co/kgs/M3s94WM"
      },
      {
        from: "Samuel Melerio",
        msg: "Efficace et réactif! Brendon a su nous rassurer et nous accompagner lors de cet achat",
        stars: 5,
        link: "https://g.co/kgs/EQTV8Ts"
      },
      {
        from: "Kikabou Jessy",
        msg: "C’est du sérieux, c’est honnête, c’est des bonnes occasions à ne pas louper.",
        stars: 5,
        link: "https://g.co/kgs/ZQrHeLh"
      },
      {
        from: "Junior Ndiaye",
        msg: "Très pro et honnête. Véhicule sans aucun problème après plusieurs semaines d’utilisation.",
        stars: 5,
        link: "https://g.co/kgs/73MHy8V"
      },
      {
        from: "Nicolas GARNIER",
        msg: "J’ai acheté un véhicule dernièrement, elle roule impeccablement bien. Ils sont très arrangeant et professionnel. Je recommande vivement !!",
        stars: 5,
        link: "https://g.co/kgs/sCB8T26"
      },
    ], [] );

  return (
    // <AnimatePresence mode="wait">
    <motion.section id={ Styles[ "about" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.div className={ Styles[ "banner" ] } variants={ variants }>
        <h1 className={ Styles[ "title" ] }>À propos de nous</h1>
        <p className={ Styles[ "desc" ] }>Découvrez notre histoire</p>
      </motion.div>
      <motion.div className={ Styles[ "info" ] } variants={ variants }>
        <div className={ Styles[ "img" ] } />
        <p className={ Styles[ "description" ] }>
          Passionné d'automobile depuis mon plus jeune âge, j'ai débuté ma carrière professionnelle à 16 ans alors que j'étudiais pour mon Bac professionnel en commerce. Parallèlement, j'ai travaillé comme apprenti dans une entreprise de vente de pièces détachées. Cette expérience m'a permis de m'immerger dans l'industrie et j'ai développé une profonde passion pour l'automobile en livrant des pièces à des concessionnaires de voitures de luxe tels que Porsche, Maserati et d'autres prestigieux.
          J'ai poursuivi mon parcours en poursuivant des études supérieures en Management Opérationnel Commercial. À la fin de mes études, j'ai décidé de me lancer dans une carrière professionnelle et j’ai donc crée World Auto.

        </p>
      </motion.div>
      <motion.div className={ Styles[ "reviews" ] } variants={ variants }>
        <h1>Avis de Google</h1>
        <div className={ Styles[ "reviews-container" ] }>
          { reviews.map( ( review, i ) => (
            <a href={ review.link } target="_blank">
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
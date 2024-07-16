import { useEffect } from "react";
import Styles from "./About.module.css";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    // <AnimatePresence mode="wait">
    <motion.section id={ Styles[ "about" ] } variants={ variants } initial="hidden" animate="animate" exit="exit">
      <motion.div className={ Styles[ "banner" ] } variants={ variants }>
        <h1 className={ Styles[ "title" ] }>About Us</h1>
        <p className={ Styles[ "desc" ] }>Discover Our Story</p>
      </motion.div>
      <motion.div className={ Styles[ "info" ] } variants={ variants }>
        <div className={ Styles[ "img" ] }></div>
        <p className={ Styles[ "description" ] }>
          Passionné d'automobile depuis mon plus jeune âge, j'ai débuté ma carrière professionnelle à 16 ans alors que j'étudiais pour mon Bac professionnel en commerce. Parallèlement, j'ai travaillé comme apprenti dans une entreprise de vente de pièces détachées. Cette expérience m'a permis de m'immerger dans l'industrie et j'ai développé une profonde passion pour l'automobile en livrant des pièces à des concessionnaires de voitures de luxe tels que Porsche, Maserati et d'autres prestigieux.
          J'ai poursuivi mon parcours en poursuivant des études supérieures en Management Opérationnel Commercial. À la fin de mes études, j'ai décidé de me lancer dans une carrière professionnelle et j’ai donc crée World Auto.

        </p>
      </motion.div>
    </motion.section>
    // </AnimatePresence>
  );
};

export default About;
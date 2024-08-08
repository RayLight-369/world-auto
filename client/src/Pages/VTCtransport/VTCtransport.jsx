import { useEffect } from 'react';
import Styles from "./VTCtransport.module.css";

const VTCtransport = () => {
  return (
    <section id={ Styles[ "vtc" ] }>
      <div className={ Styles[ "hero" ] }>
        <h1>L'excellence VTC, à tout moment</h1>
        <p className={ Styles[ "desc" ] }>Vivez un voyage en toute fluidité avec nos services VTC premium. Votre voyage, notre priorité.</p>
        <a target='_blank' href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hé, je vous ai contacté via le site WorldAuto ! Je veux parler du transport chauffeur VTC.` ) }` }>Demander un transport</a>
      </div>
    </section>
  );
};

export default VTCtransport;
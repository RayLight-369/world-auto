import { useEffect, useMemo } from 'react';
import Styles from "./VTCtransport.module.css";

const VTCtransport = () => {

  const Rates = useMemo( () => ( {
    "PARIS - ORLY": 99,
    "PARIS - PARIS": 59,
    "PARIS - BEAUVAIS": 169
  } ), [] );

  return (
    <section id={ Styles[ "vtc" ] }>
      <div className={ Styles[ "hero" ] }>
        <h1>L'excellence VTC, à tout moment</h1>
        <p className={ Styles[ "desc" ] }>Vivez un voyage en toute fluidité avec nos services VTC premium. Votre voyage, notre priorité.</p>
        <a target='_blank' href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hé, je vous ai contacté via le site WorldAuto ! Je veux parler du transport chauffeur VTC.` ) }` }>Demander un transport</a>
      </div>
      <div className={ Styles[ "rates" ] }>
        <h1>Current Rates</h1>
        { Object.entries( Rates ).map( ( [ key, val ] ) => (
          <div className={ Styles[ "rate" ] } key={ key }>
            <p className={ Styles[ 'title' ] }>{ key }</p>
            <p className={ Styles[ "price" ] }>{ val } €</p>
            <a target='_blank' href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hé, je vous ai contacté via le site WorldAuto ! Je souhaite avoir les coordonnées de *${ key }* chauffeur transport VTC` ) }` } className={ Styles[ "order" ] }>Demande</a>
          </div>
        ) ) }
      </div>
      <div className={ Styles[ "note" ] }>
        <p>Pour plus de demandes, contactez-nous sur </p>
        <a target='_blank' href={ `https://wa.me/33751287393?text=${ encodeURIComponent( `Hé, je vous ai contacté via le site WorldAuto ! Je souhaite avoir les coordonnées de chauffeur transport VTC` ) }` } className={ Styles[ "link" ] }>Whatsapp</a>
      </div>
    </section>
  );
};

export default VTCtransport;;;;;
import { useEffect } from 'react';
import Styles from "./VTCtransport.module.css";

const VTCtransport = () => {
  return (
    <section id={ Styles[ "vtc" ] }>
      <div className={ Styles[ "hero" ] }>
        <h1>Driver transport VTC</h1>
      </div>
    </section>
  );
};

export default VTCtransport;
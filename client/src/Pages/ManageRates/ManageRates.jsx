import React, { useEffect, useState } from 'react';
import Styles from "./ManageRates.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import Modal from '../../Components/Modal/Modal';
import AddRate from '../../Components/AddRate/AddRate';
import { AnimatePresence } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';

const ManageRates = () => {

  const [ rateToBeEdited, setRateToBeEdited ] = useState( null );
  const [ AddRatePopupOpen, setAddRatePopupOpen ] = useState( false );
  const [ rateToBeDeleted, setRateToBeDeleted ] = useState( null );
  const { rates } = useCars();

  useEffect( () => {
    console.log( rates );
  }, [ rates ] );

  const openPopUp = ( setState ) => setState( true );
  const closePopUp = ( setState ) => setState( false );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Tarifs Transport Chauffeur VTC" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "page-container" ] }>
            <div className={ Styles[ "buttons" ] }>
              <button type="button" onClick={ () => openPopUp( setAddRatePopupOpen ) } id={ Styles[ 'add-rate' ] }>Ajouter un tarif</button>
            </div>

            <div className={ Styles[ "table" ] }>
              <div className={ `${ Styles[ "header" ] } ${ Styles[ "row" ] }` }>

                <p className={ Styles[ "rate-title" ] }>Titre</p>
                <p className={ Styles[ "actions" ] }>Actions</p>

              </div>
              { rates?.length && rates.map( rate => (
                <div className={ `${ Styles[ "row" ] }` }>
                  <p className={ Styles[ "rate-title" ] }>{ rate.title }</p>
                  <p className={ Styles[ "actions" ] }>
                    <span className={ Styles[ "edit" ] } onClick={ () => setRateToBeEdited( rate ) }>&#9998;</span>
                    <span className={ Styles[ "del" ] } onClick={ () => setRateToBeDeleted( rate ) }>&#128465;</span>
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        { AddRatePopupOpen && (
          <Modal handleClose={ () => closePopUp( setAddRatePopupOpen ) }>
            <AddRate handleClose={ () => closePopUp( setAddRatePopupOpen ) } />
          </Modal>
        ) }
        { rateToBeEdited && (
          <Modal handleClose={ () => setRateToBeEdited( null ) }>
            <AddRate handleClose={ () => setRateToBeEdited( null ) } type='edit' rate={ rateToBeEdited } />
          </Modal>
        ) }
        { rateToBeDeleted && (
          <Modal>
            <AddRate handleClose={ () => setRateToBeDeleted( null ) } rate={ rateToBeDeleted } type={ "del" } />
          </Modal>
        ) }
      </AnimatePresence>
    </>
  );
};

export default ManageRates;;
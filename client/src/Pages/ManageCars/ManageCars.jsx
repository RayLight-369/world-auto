import React, { useEffect, useState } from 'react';
import Styles from "./ManageCars.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import Modal from '../../Components/Modal/Modal';
import AddCar from '../../Components/AddCar/AddCar';
import { AnimatePresence } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';

const ManageCars = () => {

  const [ addCarPopupOpen, setAddCarPopupOpen ] = useState( false );
  const [ carToBeEdited, setCarToBeEdited ] = useState( null );
  const [ carToBeDeleted, setCarToBeDeleted ] = useState( null );
  const { cars, brands } = useCars();
  const [ isMobile, setIsMobile ] = useState( false );

  useEffect( () => {

    const Resize = () => setIsMobile( window.innerWidth <= 768 );
    Resize();

    window.addEventListener( 'resize', Resize );

  }, [] );

  useEffect( () => {
    console.log( cars );
  }, [ cars ] );

  const openPopUp = ( setState ) => setState( true );
  const closePopUp = ( setState ) => setState( false );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Voitures" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "page-container" ] }>
            <div className={ Styles[ "buttons" ] }>
              <button type="button" onClick={ () => openPopUp( setAddCarPopupOpen ) } id={ Styles[ 'add-car' ] }>Ajouter une voiture</button>
            </div>

            <div className={ Styles[ "table" ] }>
              <div className={ `${ Styles[ "header" ] } ${ Styles[ "row" ] }` }>
                <p className={ Styles[ "car-title" ] }>Nom</p>
                <p className={ Styles[ "brand-title" ] }>Marque</p>
                <p className={ Styles[ "date" ] }>Date</p>
                <p className={ Styles[ "actions" ] }>Actions</p>
              </div>
              { cars?.length && cars.map( car => (
                <div className={ `${ Styles[ "row" ] }` }>
                  <p className={ Styles[ "car-title" ] }>{ car.title }</p>
                  <p className={ Styles[ "brand-title" ] }>{ brands?.find( brand => brand.id == car.brand )?.brandName }</p>
                  <p className={ Styles[ "date" ] }>{ car.due_date }</p>
                  <p className={ Styles[ "actions" ] }>
                    <span className={ Styles[ "edit" ] } onClick={ () => setCarToBeEdited( car ) }>&#9998;</span>
                    <span className={ Styles[ "del" ] } onClick={ () => setCarToBeDeleted( car ) }>&#128465;</span>
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        { addCarPopupOpen && (
          <Modal handleClose={ () => closePopUp( setAddCarPopupOpen ) }>
            <AddCar handleClose={ () => closePopUp( setAddCarPopupOpen ) } />
          </Modal>
        ) }
        { carToBeEdited && (
          <Modal handleClose={ () => setCarToBeEdited( null ) }>
            <AddCar handleClose={ () => setCarToBeEdited( null ) } car={ carToBeEdited } type='edit' />
          </Modal>
        ) }
        { carToBeDeleted && (
          <Modal handleClose={ () => setCarToBeDeleted( null ) }>
            <AddCar handleClose={ () => setCarToBeDeleted( null ) } car={ carToBeDeleted } type='del' />
          </Modal>
        ) }
      </AnimatePresence>
    </>
  );
};

export default ManageCars;
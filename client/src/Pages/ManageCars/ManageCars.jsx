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

  const { cars } = useCars();

  useEffect( () => {
    console.log( cars );
  }, [ cars ] );

  const openPopUp = ( setState ) => setState( true );
  const closePopUp = ( setState ) => setState( false );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Manage Cars" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "page-container" ] }>
            <div className={ Styles[ "buttons" ] }>
              <button type="button" onClick={ () => openPopUp( setAddCarPopupOpen ) } id={ Styles[ 'add-car' ] }>Add Car</button>
            </div>

            <div className={ Styles[ "table" ] }>
              <div className={ `${ Styles[ "header" ] } ${ Styles[ "row" ] }` }>
                <p className={ Styles[ "car-title" ] }>Name</p>
                <p className={ Styles[ "brand-title" ] }>Brand</p>
                <p className={ Styles[ "date" ] }>Date</p>
                <p className={ Styles[ "actions" ] }>Actions</p>
              </div>
              { cars?.length && cars.map( car => (
                <div className={ `${ Styles[ "row" ] }` }>
                  <p className={ Styles[ "car-title" ] }>{ car.title }</p>
                  <p className={ Styles[ "brand-title" ] }>{ car.brand }</p>
                  <p className={ Styles[ "date" ] }>{ car.due_date }</p>
                  <p className={ Styles[ "actions" ] }>
                    <span className={ Styles[ "edit" ] } onClick={ () => setCarToBeEdited( car ) }>&#9998;</span>
                    <span className={ Styles[ "del" ] }>&#128465;</span>
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
      </AnimatePresence>
    </>
  );
};

export default ManageCars;
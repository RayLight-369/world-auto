import React, { useEffect, useState } from 'react';
import Styles from "./ManageTrucks.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import Modal from '../../Components/Modal/Modal';
import AddCar from '../../Components/AddCar/AddCar';
import { AnimatePresence } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';
import AddTruck from '../../Components/AddTruck/AddTruck';

const ManageTrucks = () => {

  const [ addTruckPopupOpen, setAddTruckPopupOpen ] = useState( false );
  const [ truckToBeEdited, setTruckToBeEdited ] = useState( null );
  const [ truckToBeDeleted, setTruckToBeDeleted ] = useState( null );
  const { trucks, brands } = useCars();
  const [ isMobile, setIsMobile ] = useState( false );

  useEffect( () => {

    const Resize = () => setIsMobile( window.innerWidth <= 768 );
    Resize();

    window.addEventListener( 'resize', Resize );

  }, [] );

  // useEffect( () => {
  //   console.log( cars );
  // }, [ cars ] );

  const openPopUp = ( setState ) => setState( true );
  const closePopUp = ( setState ) => setState( false );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Camions" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "page-container" ] }>
            <div className={ Styles[ "buttons" ] }>
              <button type="button" onClick={ () => openPopUp( setAddTruckPopupOpen ) } id={ Styles[ 'add-car' ] }>Ajouter une Camions</button>
            </div>

            <div className={ Styles[ "table" ] }>
              <div className={ `${ Styles[ "header" ] } ${ Styles[ "row" ] }` }>
                <p className={ Styles[ "truck-title" ] }>Nom</p>
                <p className={ Styles[ "brand-title" ] }>Marque</p>
                <p className={ Styles[ "date" ] }>Date</p>
                <p className={ Styles[ "actions" ] }>Actions</p>
              </div>
              { trucks?.length && trucks.map( truck => (
                <div className={ `${ Styles[ "row" ] }` }>
                  <p className={ Styles[ "truck-title" ] }>{ truck.title }</p>
                  <p className={ Styles[ "brand-title" ] }>{ brands?.find( brand => brand.id == truck.brand )?.brandName }</p>
                  <p className={ Styles[ "date" ] }>{ truck.due_date }</p>
                  <p className={ Styles[ "actions" ] }>
                    <span className={ Styles[ "edit" ] } onClick={ () => setTruckToBeEdited( truck ) }>&#9998;</span>
                    <span className={ Styles[ "del" ] } onClick={ () => setTruckToBeDeleted( truck ) }>&#128465;</span>
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        { addTruckPopupOpen && (
          <Modal handleClose={ () => closePopUp( setAddTruckPopupOpen ) }>
            <AddTruck handleClose={ () => closePopUp( setAddTruckPopupOpen ) } />
          </Modal>
        ) }
        { truckToBeEdited && (
          <Modal handleClose={ () => setTruckToBeEdited( null ) }>
            <AddTruck handleClose={ () => setTruckToBeEdited( null ) } car={ truckToBeEdited } type='edit' />
          </Modal>
        ) }
        { truckToBeDeleted && (
          <Modal handleClose={ () => setTruckToBeDeleted( null ) }>
            <AddTruck handleClose={ () => setTruckToBeDeleted( null ) } car={ truckToBeDeleted } type='del' />
          </Modal>
        ) }
      </AnimatePresence>
    </>
  );
};

export default ManageTrucks;
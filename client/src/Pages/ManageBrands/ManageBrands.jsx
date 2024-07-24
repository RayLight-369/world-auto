import React, { useEffect, useState } from 'react';
import Styles from "./ManageBrands.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import Modal from '../../Components/Modal/Modal';
import AddBrand from '../../Components/AddBrand/AddBrand';
import { AnimatePresence } from "framer-motion";
import { useCars } from '../../Contexts/CarsContext';

const ManageCars = () => {

  const [ brandToBeEdited, setBrandToBeEdited ] = useState( null );
  const [ AddBrandPopupOpen, setAddBrandPopupOpen ] = useState( false );
  const [ brandToBeDeleted, setBrandToBeDeleted ] = useState( null );
  const { brands } = useCars();

  useEffect( () => {
    console.log( brands );
  }, [ brands ] );

  const openPopUp = ( setState ) => setState( true );
  const closePopUp = ( setState ) => setState( false );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Manage Brands" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "page-container" ] }>
            <div className={ Styles[ "buttons" ] }>
              <button type="button" onClick={ () => openPopUp( setAddBrandPopupOpen ) } id={ Styles[ 'add-brand' ] }>Add Brands</button>
            </div>

            <div className={ Styles[ "table" ] }>
              <div className={ `${ Styles[ "header" ] } ${ Styles[ "row" ] }` }>

                <p className={ Styles[ "brand-title" ] }>Name</p>
                <p className={ Styles[ "date" ] }>Date</p>
                <p className={ Styles[ "actions" ] }>Actions</p>

              </div>
              { brands?.length && brands.map( brand => (
                <div className={ `${ Styles[ "row" ] }` }>
                  <p className={ Styles[ "brand-title" ] }>{ brand.brandName }</p>
                  <p className={ Styles[ "date" ] }>{ brand.date_uploaded }</p>
                  <p className={ Styles[ "actions" ] }>
                    <span className={ Styles[ "edit" ] } onClick={ () => setBrandToBeEdited( brand ) }>&#9998;</span>
                    <span className={ Styles[ "del" ] } onClick={ () => setBrandToBeDeleted( brand ) }>&#128465;</span>
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        { AddBrandPopupOpen && (
          <Modal handleClose={ () => closePopUp( setAddBrandPopupOpen ) }>
            <AddBrand handleClose={ () => closePopUp( setAddBrandPopupOpen ) } />
          </Modal>
        ) }
        { brandToBeEdited && (
          <Modal handleClose={ () => setBrandToBeEdited( null ) }>
            <AddBrand handleClose={ () => setBrandToBeEdited( null ) } type='edit' brand={ brandToBeEdited } />
          </Modal>
        ) }
        { brandToBeDeleted && (
          <Modal>
            <AddBrand handleClose={ () => setBrandToBeDeleted( null ) } brand={ brandToBeDeleted } type={ "del" } />
          </Modal>
        ) }
      </AnimatePresence>
    </>
  );
};

export default ManageCars;;
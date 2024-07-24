import { useState } from 'react';
import Styles from "./Dashboard.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { useCars } from "../../Contexts/CarsContext";
import { AnimatePresence } from 'framer-motion';
import Modal from '../../Components/Modal/Modal';
import AddCar from '../../Components/AddCar/AddCar';
import AddBrand from '../../Components/AddBrand/AddBrand';

const Dashboard = () => {

  const { cars, brands, carsLoading } = useCars();
  const [ carToBeEdited, setCarToBeEdited ] = useState( null );
  const [ brandToBeEdited, setBrandToBeEdited ] = useState( null );
  const [ brandToBeDeleted, setBrandToBeDeleted ] = useState( null );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Dashboard" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "details-container" ] }>
            <Link to={ "/admin/cars" }>
              <div className={ `${ Styles[ "cars" ] } ${ Styles[ "container" ] }` }>
                <p className={ Styles[ "title" ] }>Cars</p>
                <p className={ Styles[ "desc" ] }>Check Your Cars Here</p>
              </div>
            </Link>

            <Link to={ "/admin/brands" }>
              <div className={ `${ Styles[ "brands" ] } ${ Styles[ "container" ] }` }>
                <p className={ Styles[ "title" ] }>Brands</p>
                <p className={ Styles[ "desc" ] }>Check Your Brands Here</p>
              </div>
            </Link>
          </div>
          <div className={ Styles[ "recent-updates-container" ] }>
            <div className={ `${ Styles[ "recent-cars" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Recently Added Cars</p>
              <div className={ Styles[ "list" ] }>
                { carsLoading && (
                  <p className={ Styles[ "no-recent-note" ] }>Loading...</p>
                ) }

                { !carsLoading && (
                  <>
                    {
                      cars.length ? cars.map( ( car ) => (
                        <div className={ Styles[ "car" ] } key={ car.id }>
                          <div className={ Styles[ "content" ] }>
                            <div className={ Styles[ "brand-title" ] }>
                              <p className={ Styles[ "car-title" ] }>{ car.title }</p>
                              <p className={ Styles[ "car-brand" ] }>{ brands?.find( brand => brand.id == car.brand ).brandName }</p>
                            </div>
                            <p className={ Styles[ "date" ] }>{ car.due_date }</p>
                          </div>
                          <div className={ Styles[ "edit-del" ] }>
                            <button className={ Styles[ 'edit-btn' ] } onClick={ () => setCarToBeEdited( car ) }>&#9998;</button>
                            <button>&#128465;</button>
                          </div>
                        </div>
                      ) ) : (
                        <p className={ Styles[ 'no-recent-note' ] }>No Cars Added!</p>
                      )
                    }
                  </>
                ) }
              </div>
            </div>
            <div className={ `${ Styles[ "recent-brands" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Recently Added Brands</p>
              <div className={ Styles[ "list" ] }>
                { carsLoading && (
                  <p className={ Styles[ "no-recent-note" ] }>Loading...</p>
                ) }

                { !carsLoading && (
                  <>
                    { brands.length ? brands.map( ( brand ) => (
                      <div className={ Styles[ "brand" ] } key={ brand.id }>
                        <div className={ Styles[ "content" ] }>
                          <p className={ Styles[ "brand-title" ] }>{ brand.brandName }</p>
                          <p className={ Styles[ "date" ] }>{ brand.date_uploaded }</p>
                        </div>
                        <div className={ Styles[ "edit-del" ] }>
                          <button className={ Styles[ 'edit-btn' ] } onClick={ () => setBrandToBeEdited( brand ) }>&#9998;</button>
                          <button onClick={ () => setBrandToBeDeleted( brand ) }>&#128465;</button>
                        </div>
                      </div>
                    ) ) : (
                      <p className={ Styles[ 'no-recent-note' ] }>No Brands Added!</p>
                    ) }
                  </>
                ) }
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        { carToBeEdited && (
          <Modal>
            <AddCar handleClose={ () => setCarToBeEdited( null ) } car={ carToBeEdited } type={ "edit" } />
          </Modal>
        ) }
        { brandToBeEdited && (
          <Modal>
            <AddBrand handleClose={ () => setBrandToBeEdited( null ) } brand={ brandToBeEdited } type={ "edit" } />
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

export default Dashboard;
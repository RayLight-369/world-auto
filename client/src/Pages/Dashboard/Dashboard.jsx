import { useEffect, useMemo, useState } from 'react';
import Styles from "./Dashboard.module.css";
import PageTitle from '../../Components/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { useCars } from "../../Contexts/CarsContext";
import { AnimatePresence } from 'framer-motion';
import Modal from '../../Components/Modal/Modal';
import AddCar from '../../Components/AddCar/AddCar';
import AddBrand from '../../Components/AddBrand/AddBrand';
import AddTruck from '../../Components/AddTruck/AddTruck';
import AddRate from '../../Components/AddRate/AddRate';

const Dashboard = () => {

  const { cars, brands, rates, trucks, carsLoading } = useCars();
  const [ carToBeEdited, setCarToBeEdited ] = useState( null );
  const [ truckToBeEdited, setTruckToBeEdited ] = useState( null );
  const [ brandToBeEdited, setBrandToBeEdited ] = useState( null );
  const [ brandToBeDeleted, setBrandToBeDeleted ] = useState( null );
  const [ rateToBeEdited, setRateToBeEdited ] = useState( null );
  const [ rateToBeDeleted, setRateToBeDeleted ] = useState( null );
  const [ carToBeDeleted, setCarToBeDeleted ] = useState( null );
  const [ truckToBeDeleted, setTruckToBeDeleted ] = useState( null );
  const [ isMobile, setIsMobile ] = useState( false );

  const Links = useMemo( () => ( {
    "cars": "voitures",
    "brands": "marques",
    "trucks": "camions",
    "rates": "tarifs"
  } ), [] );

  useEffect( () => {

    const Resize = () => setIsMobile( window.innerWidth <= 768 );
    Resize();

    window.addEventListener( 'resize', Resize );

  }, [] );

  return (
    <>
      <div className={ Styles[ "container" ] }>
        <PageTitle className={ Styles[ "page-title" ] } title={ "Tableau de bord" } />
        <div className={ Styles[ "page-content" ] }>
          <div className={ Styles[ "details-container" ] }>
            { Object.entries( Links ).map( ( [ key, val ] ) => (

              <Link to={ "/admin/" + key }>
                <div className={ `${ Styles[ key ] } ${ Styles[ "container" ] }` }>
                  <p className={ Styles[ "title" ] }>{ val }</p>
                  <p className={ Styles[ "desc" ] }>Vérifiez vos { val } ici</p>
                </div>
              </Link>

            ) ) }
          </div>
          <div className={ Styles[ "recent-updates-container" ] }>
            <div className={ `${ Styles[ "recent-cars" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Voitures récemment ajoutées</p>
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
                              <p className={ Styles[ "car-brand" ] }>{ brands?.find( brand => brand.id == car.brand )?.brandName }</p>
                            </div>
                            <p className={ Styles[ "date" ] }>{ car.due_date }</p>
                          </div>
                          <div className={ Styles[ "edit-del" ] }>
                            <button className={ Styles[ 'edit-btn' ] } onClick={ () => setCarToBeEdited( car ) }>&#9998;</button>
                            <button onClick={ () => setCarToBeDeleted( car ) }>&#128465;</button>
                          </div>
                        </div>
                      ) ) : (
                        <p className={ Styles[ 'no-recent-note' ] }>Aucune voiture ajoutée !</p>
                      )
                    }
                  </>
                ) }
              </div>
            </div>
            <div className={ `${ Styles[ "recent-trucks" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Camions récemment ajoutés</p>
              <div className={ Styles[ "list" ] }>
                { carsLoading && (
                  <p className={ Styles[ "no-recent-note" ] }>Loading...</p>
                ) }

                { !carsLoading && (
                  <>
                    {
                      trucks.length ? trucks.map( ( truck ) => (
                        <div className={ Styles[ "truck" ] } key={ truck.id }>
                          <div className={ Styles[ "content" ] }>
                            <div className={ Styles[ "brand-title" ] }>
                              <p className={ Styles[ "truck-title" ] }>{ truck.title }</p>
                              <p className={ Styles[ "truck-brand" ] }>{ brands?.find( brand => brand.id == truck.brand )?.brandName }</p>
                            </div>
                            <p className={ Styles[ "date" ] }>{ truck.due_date }</p>
                          </div>
                          <div className={ Styles[ "edit-del" ] }>
                            <button className={ Styles[ 'edit-btn' ] } onClick={ () => setTruckToBeEdited( truck ) }>&#9998;</button>
                            <button onClick={ () => setTruckToBeDeleted( truck ) }>&#128465;</button>
                          </div>
                        </div>
                      ) ) : (
                        <p className={ Styles[ 'no-recent-note' ] }>Aucune Camions ajoutée !</p>
                      )
                    }
                  </>
                ) }
              </div>
            </div>
            <div className={ `${ Styles[ "recent-brands" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Marques récemment ajoutées</p>
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
                      <p className={ Styles[ 'no-recent-note' ] }>Aucune marque ajoutée !</p>
                    ) }
                  </>
                ) }
              </div>
            </div>
            <div className={ `${ Styles[ "recent-rates" ] } ${ Styles[ "container" ] }` }>
              <p className={ Styles[ "title" ] }>Tarifs récemment ajoutées</p>
              <div className={ Styles[ "list" ] }>
                { carsLoading && (
                  <p className={ Styles[ "no-recent-note" ] }>Loading...</p>
                ) }

                { !carsLoading && (
                  <>
                    { rates.length ? rates.map( ( rate ) => (
                      <div className={ Styles[ "rate" ] } key={ rate.id }>
                        <div className={ Styles[ "content" ] }>
                          <p className={ Styles[ "rate-title" ] }>{ rate.title }</p>
                          <p className={ Styles[ "price" ] }>{ rate.price }</p>
                        </div>
                        <div className={ Styles[ "edit-del" ] }>
                          <button className={ Styles[ 'edit-btn' ] } onClick={ () => setRateToBeEdited( rate ) }>&#9998;</button>
                          <button onClick={ () => setRateToBeDeleted( rate ) }>&#128465;</button>
                        </div>
                      </div>
                    ) ) : (
                      <p className={ Styles[ 'no-recent-note' ] }>Aucune marque ajoutée !</p>
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
        { carToBeDeleted && (
          <Modal>
            <AddCar handleClose={ () => setCarToBeDeleted( null ) } car={ carToBeDeleted } type={ "del" } />
          </Modal>
        ) }
        { truckToBeEdited && (
          <Modal>
            <AddTruck handleClose={ () => setTruckToBeEdited( null ) } truck={ truckToBeEdited } type={ "edit" } />
          </Modal>
        ) }
        { truckToBeDeleted && (
          <Modal>
            <AddTruck handleClose={ () => setTruckToBeDeleted( null ) } truck={ truckToBeDeleted } type={ "del" } />
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
        { rateToBeEdited && (
          <Modal>
            <AddRate handleClose={ () => setRateToBeEdited( null ) } rate={ rateToBeEdited } type={ "edit" } />
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

export default Dashboard;
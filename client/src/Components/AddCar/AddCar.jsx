import { useEffect, useMemo, useState } from 'react';
import styles from "./AddCar.module.css";
import { MotionConfig, motion } from 'framer-motion';
import DropDown from '../DropDown/DropDown';
import { useCars } from '../../Contexts/CarsContext';
import { API } from '../../Constants';
import { updateData } from "../../Supabase";
import {
  processFileSelection,
  syncImagesWithSupabase,
  extractFileIdFromUrl
} from '../../utils/imageHandler';


const AddCar = ( { handleClose, type = "new", car, rent = false } ) => {

  // const navigate = useNavigate();
  const { setCars, brands, setRentalCars } = useCars();
  const [ carID, setCarID ] = useState( car?.id || 0 );
  const [ adding, setAdding ] = useState( false );
  const [ carTitle, setCarTitle ] = useState( car?.title || "" );
  const [ carOverview, setCarOverview ] = useState( car?.overview || "" );
  const [ brand, setBrand ] = useState( brands?.find( brand_ => brand_.id == car?.brand )?.brandName || undefined );
  const [ fuelType, setFuelType ] = useState( car?.fuel_type || "" );
  const [ pricePerDay, setPricePerDay ] = useState( car?.price_per_day || 0 );
  const [ pricePerMonth, setPricePerMonth ] = useState( car?.price_per_month || 0 );
  const [ pricePerWeek, setPricePerWeek ] = useState( car?.price_per_week || 0 );
  const [ pricePerWeekend, setPricePerWeekend ] = useState( car?.price_per_weekend || 0 );
  const [ dayMileage, setDayMileage ] = useState( car?.day_mileage || 0 );
  const [ weekMileage, setWeekMileage ] = useState( car?.week_mileage || 0 );
  const [ weekendMileage, setWeekendMileage ] = useState( car?.weekend_mileage || 0 );
  const [ mileage, setMilage ] = useState( car?.mileage || "" );
  const [ energy, setEnergy ] = useState( car?.energy || "" );
  const [ guarantee, setGuarantee ] = useState( car?.guarantee || "" );
  const [ color, setColor ] = useState( car?.color || "" );
  const [ certificate, setCertificate ] = useState( car?.certificate || "" );
  const [ emission, setEmission ] = useState( car?.emission || "" );
  const [ modelYear, setModelYear ] = useState( car?.model_year || "" );
  const [ seatingCapacity, setSeatingCapacity ] = useState( car?.seating_capacity || "" );
  const [ gearbox, setGearbox ] = useState( car?.gearbox || "" );
  const [ accessories, setAccessories ] = useState( car?.accessories || [] );
  const [ sold, setSold ] = useState( !!( car?.sold ) || false );
  const [ fuelDropdown, toggleFuelDropdown ] = useState( false );
  const [ brandDropdown, toggleBrandDropdown ] = useState( false );
  const [ gearboxDropdown, toggleGearboxDropdown ] = useState( false );
  const [ selling, setSelling ] = useState( false );

  const [ images, setImages ] = useState( car?.images || [] );
  const [ imagesData, setImagesData ] = useState( {} );

  const Accessories = useMemo( () => [
    "Climatiseur",
    "Serrures de porte électriques",
    "Système de freinage antiblocage",
    "Assistance au freinage",
    "Direction assistée",
    "Airbag conducteur",
    "Airbag passager",
    "Vitres électriques",
    "Lecteur CD",
    "Verrouillage centralisé",
    "Capteur de collision",
    "Sièges en cuir",
    "Bluetooth",
    "Caméra de vision arrière",
    "Automatique"
  ], [] );

  // <div className={ styles[ "price-per-day" ] }>
  //   <label htmlFor="price-per-day">Price Per Day:</label>
  //   <input onChange={ ( e ) => {
  //     setPricePerDay( e.target.value );
  //   } } value={ pricePerDay } type="number" min={ 0 } name="price-per-day" id="price-per-day" className={ styles[ 'price-per-day-input' ] } />
  // </div>;


  // useEffect( () => {
  //   console.log( brands?.map( ( brand, i ) => brand.brandName ) );
  // }, [ brands ] );

  const data = useMemo( () => [
    {
      element: "Prix / Jour €",
      class: "price-per-day",
      inputClass: "price-per-day-input",
      setState: setPricePerDay,
      value: pricePerDay,
      type: "text"
    },
    ...( !rent ? [ {
      element: "Prix / Mois €",
      class: "price-per-month",
      inputClass: "price-per-month-input",
      setState: setPricePerMonth,
      value: pricePerMonth,
      type: "text"
    } ] : [
      {
        element: "Prix / semaine €",
        class: "price-per-week",
        inputClass: "price-per-week-input",
        setState: setPricePerWeek,
        value: pricePerWeek,
        type: "text"
      },
      {
        element: "Prix / fin de semaine €",
        class: "price-per-weekend",
        inputClass: "price-per-weekend-input",
        setState: setPricePerWeekend,
        value: pricePerWeekend,
        type: "text"
      },
      {
        element: "kilométrage / jour",
        class: "day-mileage",
        inputClass: "day-mileage-input",
        setState: setDayMileage,
        value: dayMileage,
        type: "text"
      },
      {
        element: "kilométrage / semaine",
        class: "week-mileage",
        inputClass: "week-mileage-input",
        setState: setWeekMileage,
        value: weekMileage,
        type: "text"
      },
      {
        element: "kilométrage / fin de semaine",
        class: "weekend-mileage",
        inputClass: "weekend-mileage-input",
        setState: setWeekendMileage,
        value: weekendMileage,
        type: "text"
      },
    ] ),
    {
      element: "Kilométrage",
      class: "mileage",
      inputClass: "mileage-input",
      setState: setMilage,
      value: mileage,
      type: "number"
    },
    {
      element: "Énergie",
      class: "energy",
      inputClass: "energy-input",
      setState: setEnergy,
      value: energy,
      type: "text"
    },
    {
      element: "Garantie",
      class: "guarantee",
      inputClass: "guarantee-input",
      setState: setGuarantee,
      value: guarantee,
      type: "text"
    },
    {
      element: "Couleur",
      class: "color",
      inputClass: "color-input",
      setState: setColor,
      value: color,
      type: "text"
    },
    {
      element: "Certificat",
      class: "certificate",
      inputClass: "certificate-input",
      setState: setCertificate,
      value: certificate,
      type: "text"
    },
    {
      element: "Émission",
      class: "emission",
      inputClass: "emission-input",
      setState: setEmission,
      value: emission,
      type: "text"
    },
    {
      element: "Année modèle",
      class: "model-year",
      inputClass: "model-year-input",
      setState: setModelYear,
      value: modelYear,
      type: "text"
    },
    {
      element: "Nombre de places",
      class: "seating-capacity",
      inputClass: "seating-capacity-input",
      setState: setSeatingCapacity,
      value: seatingCapacity,
      type: "number"
    },
    // {
    //   element: "Gearbox",
    //   class: "gearbox",
    //   inputClass: "gearbox-input",
    //   setState: setGearbox,
    //   value: gearbox,
    //   type: "text"
    // }
  ], [ pricePerDay, pricePerMonth, mileage, energy, guarantee, color, certificate, emission, modelYear, seatingCapacity, rent, pricePerWeek, pricePerWeekend, dayMileage, weekMileage, weekendMileage ] );


  // const [ priorityInput, setPriorityInput ] = useState( "" );
  // const [ assigneeInput, setAssigneeInput ] = useState( "" );
  // const [ reporterInput, setReporterInput ] = useState( "" );
  const currentDate = new Date();
  const dateInput = useMemo( () => `${ currentDate.getFullYear() }-${ currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : "0" + ( currentDate.getMonth() + 1 ) }-${ currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate() }`, [] );

  useEffect( () => {
    if ( type == "edit" || type == "del" ) {
      setCarID( car.id );
    }
  } );

  // Initialize images data when component mounts or car changes
  useEffect( () => {
    if ( type === "edit" && car?.images ) {
      // In edit mode, initialize with existing image URLs as values
      const imagesToMap = car.images.reduce( ( acc, url ) => {
        acc[ url ] = url;
        return acc;
      }, {} );
      setImagesData( imagesToMap );
    } else {
      // In new mode, start with empty
      setImagesData( {} );
    }
  }, [ car, type ] );


  const handleFileChange = async ( e ) => {
    try {
      const newImages = await processFileSelection( e );
      setImagesData( ( prev ) => ( { ...prev, ...newImages } ) );
    } catch ( error ) {
      console.error( 'Error processing files:', error );
      alert( 'Error processing images. Please try again.' );
    }
  };


  const handleDeleteImage = ( e, imageKey ) => {
    e.preventDefault();
    e.stopPropagation();

    setImagesData( ( prev ) => {
      const updated = { ...prev };
      delete updated[ imageKey ];
      return updated;
    } );
  };


  // helper to upload/delete images
  const syncCarImages = async ( mode = "new", carId = carID ) => {
    try {
      const finalImages = await syncImagesWithSupabase(
        imagesData,
        carId,
        images,
        mode
      );

      // Update database with final images
      if ( mode !== "delete" && mode !== "del" ) {
        await updateData( {
          table: "Cars",
          where: { id: carId },
          object: { images: finalImages }
        } );
      }

      setImages( finalImages );
      return finalImages;
    } catch ( error ) {
      console.error( `Error syncing images (${ mode }):`, error );
      throw error;
    }
  };



  const buttonWhileHovering = ( scale = 1.1, duration = .1 ) => ( {
    scale,
    transition: {
      duration
    }
  } );


  async function addCar() {
    setAdding( true );

    const dateParts = dateInput.split( "-" );
    [ dateParts[ 0 ], dateParts[ 2 ] ] = [ dateParts[ 2 ], dateParts[ 0 ] ];
    const due_date = dateParts.join( "-" );

    // Validate required fields
    if ( !car && ( !carTitle.trim().length || !Object.keys( imagesData ).length ) ) {
      setAdding( false );
      alert( 'Please provide a title and at least one image.' );
      return;
    }

    const ReqData = {
      title: carTitle,
      overview: carOverview,
      due_date,
      brand,
      fuel_type: fuelType,
      accessories,
      certificate,
      color,
      gearbox,
      emission,
      energy,
      mileage,
      guarantee,
      seating_capacity: seatingCapacity,
      model_year: modelYear,
      price_per_day: pricePerDay,
      price_per_month: pricePerMonth,
      rent,
      ...( rent && {
        price_per_week: pricePerWeek,
        price_per_weekend: pricePerWeekend,
        day_mileage: dayMileage,
        week_mileage: weekMileage,
        weekend_mileage: weekendMileage
      } )
    };

    if ( type === "edit" || type === "del" ) {
      ReqData.id = car.id;
    }

    try {
      const res = await fetch(
        type === "edit" ? API.EDIT_CAR : type === "new" ? API.NEW_CAR : API.DEL_CAR,
        {
          method: type === "edit" ? "PUT" : type === "new" ? "POST" : "DELETE",
          body: JSON.stringify( ReqData ),
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if ( !res.ok ) {
        throw new Error( 'Failed to save car' );
      }

      const body = await res.json();
      const updatedCar = body.data[ 0 ];
      setCarID( updatedCar.id );

      // Sync images with Supabase using the correct car id
      let finalImages = [];
      if ( type === "new" ) {
        finalImages = await syncCarImages( "new", updatedCar.id );
      } else if ( type === "edit" ) {
        finalImages = await syncCarImages( "edit", updatedCar.id );
      } else if ( type === "del" ) {
        await syncCarImages( "delete", updatedCar.id );
        finalImages = [];
      }

      // Update the context with the car
      if ( type === "edit" ) {
        if ( !rent ) {
          setCars( prevCars =>
            prevCars.map( prevCar =>
              prevCar.id === updatedCar.id ? { ...updatedCar, images: finalImages } : prevCar
            )
          );
        } else {
          setRentalCars( prevCars =>
            prevCars.map( prevCar =>
              prevCar.id === updatedCar.id ? { ...updatedCar, images: finalImages } : prevCar
            )
          );
        }
      } else if ( type === "del" ) {
        if ( !rent ) {
          setCars( prevCars =>
            prevCars.filter( prevCar => prevCar.id !== ReqData.id )
          );
        } else {
          setRentalCars( prevCars =>
            prevCars.filter( prevCar => prevCar.id !== ReqData.id )
          );
        }
      } else {
        // New car
        if ( !rent ) {
          setCars( prev => [ { ...updatedCar, images: finalImages }, ...prev ] );
        } else {
          setRentalCars( prev => [ { ...updatedCar, images: finalImages }, ...prev ] );
        }
      }

      handleClose();
    } catch ( error ) {
      console.error( 'Error saving car:', error );
      alert( `Error: ${ error.message }` );
    } finally {
      setAdding( false );
    }
  }

  async function handleSold() {
    const newSoldStatus = !sold;

    let confirmed = window.confirm(
      newSoldStatus
        ? "Voulez-vous vendre cette voiture?"
        : "Voulez-vous annuler la vente de cette voiture?"
    );

    if ( !confirmed ) return;

    setSold( newSoldStatus );
    setSelling( true );

    try {
      const res = await fetch( API.EDIT_CAR, {
        method: "PATCH",
        body: JSON.stringify( { sold: newSoldStatus, id: carID } ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        const updatedCar = body.data[ 0 ];

        setCars( prevCars =>
          prevCars.map( prevCar =>
            prevCar.id === updatedCar.id ? updatedCar : prevCar
          )
        );

        handleClose();
      } else {
        setSold( !newSoldStatus );
        console.error( "Failed to update status" );
      }
    } catch ( e ) {
      setSold( !newSoldStatus );
      console.log( e );
    } finally {
      setSelling( false );
    }
  }

  return (
    <MotionConfig transition={ { type: "spring", damping: 7 } } >
      <div className={ styles[ "add-car" ] }>
        <div className={ styles[ "header" ] }>
          <p className={ styles[ "title" ] }>{ type === "edit" ? "Modifiez votre voiture" : type == "new" ? "Ajouter une nouvelle voiture" : "Es-tu sûr?" }</p>
          <motion.button type='button' whileHover={ buttonWhileHovering( 1.2, .2 ) } className={ styles[ 'close' ] } onClick={ handleClose }>✖</motion.button>
        </div>
        {
          type != "del" && (
            <>
              <div className={ styles[ "inputs" ] }>
                <input type="text" placeholder='Titre de la voiture' className={ styles[ "name" ] } value={ carTitle } onChange={ e => setCarTitle( e.target.value ) } />
                <textarea placeholder='Aperçu de la voiture' className={ styles[ "description" ] } value={ carOverview } onChange={ e => setCarOverview( e.target.value ) } />
              </div>

              <div className={ styles[ "infos" ] }>

                <DropDown key={ "fuelType" } setState={ setFuelType } selected={ fuelType } array={ [ "Diesel", "Essence", "Essence sans plomb", "GNC", "électrique" ] } label='Carburant' dropDownOpen={ fuelDropdown } toggleDropDown={ toggleFuelDropdown } />
                <DropDown key={ "brand" } setState={ setBrand } selected={ brand } array={ brands?.map( ( brand ) => brand.brandName ) } backWorkArray={ brands?.map( brand => brand.id ) } label='Marque' dropDownOpen={ brandDropdown } toggleDropDown={ toggleBrandDropdown } />
                <DropDown key={ "gearbox" } setState={ setGearbox } selected={ gearbox } array={ [ "Automatique", "Manuel", "Automatique à variation continue" ] } label='Boîte de vitesses' dropDownOpen={ gearboxDropdown } toggleDropDown={ toggleGearboxDropdown } />

                { data.map( ( value, index ) => (

                  <div className={ styles[ value.class ] } key={ index }>
                    <label htmlFor={ value.class }>{ value.element }:</label>
                    <input onChange={ ( e ) => {
                      value.setState( e.target.value );
                    } } value={ value.value } type={ value.type } name={ value.class } id={ value.class } className={ styles[ value.inputClass ] } />
                  </div>

                ) ) }

                <div className={ styles[ "accessories" ] }>
                  <label htmlFor="accessories">Accessoires:</label>
                  <div className={ styles[ "content" ] }>
                    { Accessories.map( ( a, i ) => (
                      <div className={ styles[ "accessory" ] }>
                        <label htmlFor={ a.split( " " )[ 0 ] }>{ a }</label>
                        <input type="checkbox" name={ a.split( " " )[ 0 ] } id={ a.split( " " )[ 0 ] } checked={ accessories.includes( a ) } onChange={ e => {
                          if ( e.target.checked ) {
                            setAccessories( prev => [ ...prev, a ] );
                          } else {
                            setAccessories( prev => {
                              if ( prev.includes( a ) ) {
                                return prev.filter( p => p !== a );
                              }
                            } );
                          }

                        } } />
                        {/* <BreakSpan /> */ }
                      </div>
                    ) ) }
                  </div>
                </div>

                <div className={ styles[ "images" ] }>
                  <p>Images: </p>
                  <label htmlFor={ "file" } className={ styles[ "image-label" ] }>
                    Sélectionnez des images
                  </label>
                  <input
                    type="file"
                    onChange={ handleFileChange }
                    multiple
                    name="file"
                    id={ "file" }
                    min={ 1 }
                    max={ 9 }
                    accept="image/*"
                    style={ { display: "none" } }
                  />

                  {/* </div> */ }

                  <div className={ styles[ "img-container" ] }>
                    { Object.keys( imagesData ).map( ( img ) => (
                      <div className={ styles[ "img-box" ] } key={ img }>
                        <img
                          src={ img }
                          width={ 200 }
                          height={ 200 }
                          alt="ad image"
                          className={ styles[ "img" ] }
                        />

                        <button
                          className={ styles[ "delete-img" ] }
                          onClick={ ( e ) => handleDeleteImage( e, img ) }
                        >
                          ✖
                        </button>
                      </div>
                    ) ) }
                  </div>
                </div>

              </div>
            </>
          )
        }
        <div className={ styles[ "buttons" ] }>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "add-button" ] }
            onClick={ addCar }
            disabled={ adding }
          >
            { adding ? type == 'new' ? "Ajouter..." : type == "edit" ? "Mise à jour..." : "Suppression..." : type == 'new' ? "Ajouter" : type == "edit" ? "Mise à jour" : "Supprimer" }
          </motion.button>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "cancel-button" ] }
            onClick={ handleClose }
          >
            Annuler
          </motion.button>
          { type == "edit" && !rent && (
            <motion.button
              whileHover={ buttonWhileHovering( 1.1, .2 ) }
              className={ styles[ "cancel-button" ] }
              onClick={ handleSold }
            >
              { sold ? "Rendre disponible" : "Vendu" }
            </motion.button>
          ) }
        </div>
      </div>
    </MotionConfig>
  );
};

export default AddCar;
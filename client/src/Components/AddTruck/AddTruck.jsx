import { useEffect, useMemo, useState } from 'react';
import styles from "./AddTruck.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import { useCars } from '../../Contexts/CarsContext';
import { API } from '../../Constants';
import { v4 as uid } from "uuid";
import { uploadFile, updateData, deleteFile } from "../../Supabase";


const AddTruck = ( { handleClose, type = "new", truck } ) => {

  // const navigate = useNavigate();
  const { setTrucks, brands } = useCars();
  const [ truckID, setTruckID ] = useState( truck?.id || 0 );
  const [ adding, setAdding ] = useState( false );
  const [ truckTitle, setTruckTitle ] = useState( truck?.title || "" );
  const [ truckOverview, setTruckOverview ] = useState( truck?.overview || "" );
  const [ pricePerDay, setPricePerDay ] = useState( truck?.price_per_day || 0 );

  const [ brand, setBrand ] = useState( brands?.find( brand => brand.id == truck?.brand )?.brandName || undefined );
  const [ fuelType, setFuelType ] = useState( truck?.fuel_type || "" );
  // const [ pricePerMonth, setPricePerMonth ] = useState( truck?.price_per_month || 0 );
  // const [ mileage, setMilage ] = useState( truck?.milage || "" );
  // const [ guarantee, setGuarantee ] = useState( truck?.guarantee || "" );
  // const [ color, setColor ] = useState( truck?.color || "" );
  // const [ certificate, setCertificate ] = useState( truck?.certificate || "" );
  // const [ emission, setEmission ] = useState( truck?.emission || "" );
  // const [ modelYear, setModelYear ] = useState( truck?.modelYear || "" );
  // const [ seatingCapacity, setSeatingCapacity ] = useState( truck?.seating_capacity || "" );

  const [ energy, setEnergy ] = useState( truck?.energy || "" );
  const [ gearbox, setGearbox ] = useState( truck?.gearbox || "" );
  const [ commercialPower, setCommercialPower ] = useState( truck?.commercial_power || "" );
  const [ fiscalPower, setFiscalPower ] = useState( truck?.fiscal_power || "" );
  const [ mixedConsumption, setMixedConsumption ] = useState( truck?.mixed_consumption || "" );
  const [ co2Emission, setCO2Emission ] = useState( truck?.co2_emission || "" );
  const [ bodyType, setBodyType ] = useState( truck?.body_type || "" );
  const [ endOfCommercializationDate, setEndOfCommercializationDate ] = useState( truck?.end_of_commercialization_date || "" );
  const [ newVehiclePrice, setNewVehiclePrice ] = useState( truck?.new_vehicle_price || "" );
  const [ dimensions, setDimensions ] = useState( truck?.dimensions || {} );
  const [ weight, setWeight ] = useState( truck?.weight || {} );

  const [ accessories, setAccessories ] = useState( truck?.accessories || [] );
  const [ fuelDropdown, toggleFuelDropdown ] = useState( false );
  const [ brandDropdown, toggleBrandDropdown ] = useState( false );
  const [ gearboxDropdown, toggleGearboxDropdown ] = useState( false );

  const [ images, setImages ] = useState( truck?.images || [] );
  const [ imagesData, setImagesData ] = useState( {} );
  const [ imagesDone, setImagesDone ] = useState( false );

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

  const Dimensions = useMemo( () => [
    {
      element: "Longueur",
      class: "longueur",
      inputClass: "longueur-input",
      setState: value => setDimensions( prev => ( { ...prev, "Longueur": value } ) ),
      value: dimensions?.[ "Longueur" ],
      type: "text"
    },
    {
      element: "Largeur",
      class: "largeur",
      inputClass: "largeur-input",
      setState: value => setDimensions( prev => ( { ...prev, "Largeur": value } ) ),
      value: dimensions?.[ "Largeur" ],
      type: "text"
    },
    {
      element: "Hauteur",
      class: "hauteur",
      inputClass: "hauteur-input",
      setState: value => setDimensions( prev => ( { ...prev, "Hauteur": value } ) ),
      value: dimensions?.[ "Hauteur" ],
      type: "text"
    },
    {
      element: "Hauteur avec barres de toit",
      class: "hauteur-barres-toit",
      inputClass: "hauteur-barres-toit-input",
      setState: value => setDimensions( prev => ( { ...prev, "Hauteur avec barres de toit": value } ) ),
      value: dimensions?.[ "Hauteur avec barres de toit" ],
      type: "text"
    },
    {
      element: "Empattement",
      class: "empattement",
      inputClass: "empattement-input",
      setState: value => setDimensions( prev => ( { ...prev, "Empattement": value } ) ),
      value: dimensions?.[ "Empattement" ],
      type: "text"
    },
    {
      element: "Réservoir",
      class: "reservoir",
      inputClass: "reservoir-input",
      setState: value => setDimensions( prev => ( { ...prev, "Réservoir": value } ) ),
      value: dimensions?.[ "Réservoir" ],
      type: "text"
    },
    {
      element: "Porte à faux avant",
      class: "porte-faux-avant",
      inputClass: "porte-faux-avant-input",
      setState: value => setDimensions( prev => ( { ...prev, "Porte à faux avant": value } ) ),
      value: dimensions?.[ "Porte à faux avant" ],
      type: "text"
    },
    {
      element: "Porte à faux arrière",
      class: "porte-faux-arriere",
      inputClass: "porte-faux-arriere-input",
      setState: value => setDimensions( prev => ( { ...prev, "Porte à faux arrière": value } ) ),
      value: dimensions?.[ "Porte à faux arrière" ],
      type: "text"
    },
    {
      element: "Voies avant",
      class: "voies-avant",
      inputClass: "voies-avant-input",
      setState: value => setDimensions( prev => ( { ...prev, "Voies avant": value } ) ),
      value: dimensions?.[ "Voies avant" ],
      type: "text"
    },
    {
      element: "Voies arrière",
      class: "voies-arriere",
      inputClass: "voies-arriere-input",
      setState: value => setDimensions( prev => ( { ...prev, "Voies arrière": value } ) ),
      value: dimensions?.[ "Voies arrière" ],
      type: "text"
    }
  ], [] );

  const Weights = useMemo( () => [
    {
      element: "Poids à vide",
      class: "poids-vide",
      inputClass: "poids-vide-input",
      setState: value => setWeight( prev => ( { ...prev, "Poids à vide": value } ) ),
      value: truck?.weights?.[ "Poids à vide" ] || "",
      type: "text"
    },
    {
      element: "PTAC (Poids Total Autorisé en Charge)",
      class: "ptac",
      inputClass: "ptac-input",
      setState: value => setWeight( prev => ( { ...prev, "PTAC (Poids Total Autorisé en Charge)": value } ) ),
      value: truck?.weights?.[ "PTAC (Poids Total Autorisé en Charge)" ] || "",
      type: "text"
    },
    {
      element: "PTRA (Poids Total Roulant Autorisé)",
      class: "ptra",
      inputClass: "ptra-input",
      setState: value => setWeight( prev => ( { ...prev, "PTRA (Poids Total Roulant Autorisé)": value } ) ),
      value: truck?.weights?.[ "PTRA (Poids Total Roulant Autorisé)" ] || "",
      type: "text"
    },
    {
      element: "Charge utile",
      class: "charge-utile",
      inputClass: "charge-utile-input",
      setState: value => setWeight( prev => ( { ...prev, "Charge utile": value } ) ),
      value: truck?.weights?.[ "Charge utile" ] || "",
      type: "text"
    },
    {
      element: "Poids tracté freiné",
      class: "poids-tracte-freine",
      inputClass: "poids-tracte-freine-input",
      setState: value => setWeight( prev => ( { ...prev, "Poids tracté freiné": value } ) ),
      value: truck?.weights?.[ "Poids tracté freiné" ] || "",
      type: "text"
    },
    {
      element: "Poids tracté non freiné",
      class: "poids-tracte-non-freine",
      inputClass: "poids-tracte-non-freine-input",
      setState: value => setWeight( prev => ( { ...prev, "Poids tracté non freiné": value } ) ),
      value: truck?.weights?.[ "Poids tracté non freiné" ] || "",
      type: "text"
    }
  ], [ [] ] );



  // const Dimensions = useMemo( () => ( {
  //   "Longueur": truck?.dimensions?.length || "",
  //   "Largeur": truck?.dimensions?.width || "",
  //   "Hauteur": truck?.dimensions?.height || "",
  //   "Hauteur avec barres de toit": truck?.dimensions?.height_with_roof_bars || "",
  //   "Empattement": truck?.dimensions?.wheelbase || "",
  //   "Réservoir": truck?.dimensions?.fuel_tank || "",
  //   "Porte à faux avant": truck?.dimensions?.front_overhang || "",
  //   "Porte à faux arrière": truck?.dimensions?.rear_overhang || "",
  //   "Voies avant": truck?.dimensions?.front_track || "",
  //   "Voies arrière": truck?.dimensions?.rear_track || ""
  // } ), [ truck ] );

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
      element: "Prix €",
      class: "price",
      inputClass: "price-input",
      setState: setPricePerDay,
      value: pricePerDay,
      type: "number"
    }, {
      element: "Énergie",
      class: "energie",
      inputClass: "energie-input",
      setState: setEnergy,
      value: energy,
      type: "text"
    },
    {
      element: "Puissance commerciale",
      class: "puissance-commerciale",
      inputClass: "puissance-commerciale-input",
      setState: setCommercialPower,
      value: commercialPower,
      type: "text"
    },
    {
      element: "Puissance fiscale",
      class: "puissance-fiscale",
      inputClass: "puissance-fiscale-input",
      setState: setFiscalPower,
      value: fiscalPower,
      type: "text"
    },
    {
      element: "Consommation mixte",
      class: "consommation-mixte",
      inputClass: "consommation-mixte-input",
      setState: setMixedConsumption,
      value: mixedConsumption,
      type: "text"
    },
    {
      element: "Émission de CO₂",
      class: "emission-co2",
      inputClass: "emission-co2-input",
      setState: setCO2Emission,
      value: co2Emission,
      type: "text"
    },
    {
      element: "Carrosserie",
      class: "carrosserie",
      inputClass: "carrosserie-input",
      setState: setBodyType,
      value: bodyType,
      type: "text"
    },
    {
      element: "Date de fin de commercialisation",
      class: "date-fin-commercialisation",
      inputClass: "date-fin-commercialisation-input",
      setState: setEndOfCommercializationDate,
      value: endOfCommercializationDate,
      type: "text"
    }
    // {
    //   element: "Gearbox",
    //   class: "gearbox",
    //   inputClass: "gearbox-input",
    //   setState: setGearbox,
    //   value: gearbox,
    //   type: "text"
    // }
  ], [
    pricePerDay,
    energy,
    commercialPower,
    fiscalPower,
    mixedConsumption,
    co2Emission,
    gearbox,
    bodyType,
    endOfCommercializationDate
  ] );


  // const [ priorityInput, setPriorityInput ] = useState( "" );
  // const [ assigneeInput, setAssigneeInput ] = useState( "" );
  // const [ reporterInput, setReporterInput ] = useState( "" );
  const currentDate = new Date();
  const [ dateInput, setDateInput ] = useState( `${ currentDate.getFullYear() }-${ currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : "0" + ( currentDate.getMonth() + 1 ) }-${ currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate() }` );


  useEffect( () => {

    let IMG_OBJECT =
      type == "edit"
        ? [ ...truck?.images ]?.reduce( ( p, c ) => {
          p[ c ] = c;
          return p;
        }, {} )
        : {};

    console.log( "truck.imgs from line 165: ", truck?.images );
    setImagesData( IMG_OBJECT );

  }, [] );

  useEffect( () => console.log( "img obj:  ", imagesData ), [ imagesData ] );

  useEffect( () => {

    if ( type == "edit" ) {
      setImagesData( {
        ...[ ...truck?.images || images ]?.reduce( ( p, c ) => {
          p[ c ] = c;
          return p;
        }, {} ),
      } );
    }
    console.log( truck );

  }, [ truck ] );

  function deleteEntry ( obj, indexToDelete ) {
    const keys = Object.keys( obj );

    if ( indexToDelete < 0 || indexToDelete >= keys.length ) {
      return obj; // Index out of range, return the original object
    }

    const updatedObj = { ...obj };
    const keyToDelete = keys[ indexToDelete ];
    delete updatedObj[ keyToDelete ];

    return updatedObj;
  }

  const handleFileChange = ( e ) => {
    let files = e.target.files;

    for ( let file of files ) {
      setImagesData( ( prev ) => ( {
        ...prev,
        [ URL.createObjectURL( file ) ]: file,
      } ) );
    }
  };

  const handleDelete = ( e, key ) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedImages = deleteEntry( imagesData, key );

    setImagesData( { ...updatedImages } );
  };


  const SetImages = async ( images_, Truck ) => {

    let imageArray = [];

    for ( let image in images_ ) {

      let fileId = uid();
      let extension = images_[ image ].type.replace( "image/", "" ).toLowerCase();

      imageArray.push(
        `${ process.env.REACT_APP_SUPABASE_URL }/storage/v1/object/public/images/trucks/${ Truck.id }/${ fileId }.${ extension }`
      );

      await uploadFile(
        Truck.id,
        fileId + "." + extension,
        images_[ image ]
      );
    };

    let _images = images;
    _images = [ ...imageArray ];

    setImages( prev => ( [ ...prev, ...imageArray ] ) );
    setImagesDone( true );

    const ReqData = {
      images
    };

    try {

      // const res = await fetch( API.EDIT_TRUCK, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify( ReqData )
      // } );

      console.log( "casasasar: ", truck );
      console.log( "i: ", imageArray );
      console.log( "r: ", ReqData );

    } catch ( e ) {
      console.log( e );
    }
  };



  // const getMissingImages = ( imagesArray, obj ) => {
  //   const objKeysSet = new Set( Object.keys( obj ) );
  //   return imagesArray.filter( ( image ) => !objKeysSet.has( image ) );
  // };

  // const SetImages = async ( images_ ) => {
  //   const imageArray = [];
  //   const deletedImages = getMissingImages( images, images_ );

  //   for ( let image in images ) {
  //     if ( typeof images[ image ] !== "string" ) {
  //       const fileId = uuidv4();
  //       const extension = images[ image ].type.replace( "image/", "" ).toLowerCase();

  //       imageArray.push(
  //         `https://lmxqvapkmczkpcfheiun.supabase.co/storage/v1/object/public/images/trucks/${ postID }/${ fileId }.${ extension }`
  //       );
  //       await uploadFile(
  //         session?.user.id,
  //         postID,
  //         `${ fileId }.${ extension }`,
  //         images[ image ]
  //       );
  //     } else {
  //       imageArray.push( image );
  //     }
  //   }

  //   if ( deletedImages.length ) {
  //     for ( const image of deletedImages ) {
  //       const url = image.split( "/" );
  //       const fileID = url[ url.length - 1 ];
  //       await deleteFile( `users/${ session?.user.id }/${ postID }/${ fileID }` );
  //     }
  //   }

  //   let _post = post;
  //   _post.images = imageArray;

  //   setPost( ( prev ) => ( { ...prev, images: [ ...imageArray ] } ) );
  // };

  const buttonWhileHovering = ( scale = 1.1, duration = .1 ) => ( {
    scale,
    transition: {
      duration
    }
  } );

  useEffect( () => {
    if ( images.length && imagesDone ) {
      ( async () => {

        const Data = await updateData( {
          table: "Trucks",
          where: {
            id: truckID
          },
          object: {
            images
          }
        } );

        const truck = Data.data[ 0 ];

        setTrucks( prev =>
          prev.map( prevTruck => truck.id == prevTruck.id ? truck : prevTruck )
        );

      } )();
    }
  }, [ images, imagesDone ] );


  const getMissingImages = ( imagesArray, obj ) => {
    const objKeysSet = new Set( Object.keys( obj ) );
    return imagesArray.filter( ( image ) => !objKeysSet.has( image ) );
  };

  const SetImages_Edit = async ( images_, truck ) => {
    setImagesDone( false );
    const imageArray = [];
    const deletedImages = getMissingImages( truck.images, images_ );

    for ( let image in images_ ) {
      if ( typeof images_[ image ] !== "string" ) {
        const fileId = uid();
        const extension = images_[ image ].type.replace( "image/", "" ).toLowerCase();

        imageArray.push(
          `${ process.env.REACT_APP_SUPABASE_URL }/storage/v1/object/public/images/trucks/${ truck.id }/${ fileId }.${ extension }`
        );
        await uploadFile(
          truck.id,
          `${ fileId }.${ extension }`,
          images_[ image ]
        );
      } else {
        imageArray.push( image );
      }
    }

    if ( deletedImages.length ) {
      for ( const image of deletedImages ) {
        const url = image.split( "/" );
        const fileID = url[ url.length - 1 ];
        await deleteFile( `trucks/${ truck.id }/${ fileID }` );
      }
    }

    let _truck = truck;
    _truck.images = imageArray;

    setImages( ( prev ) => ( [ ...imageArray ] ) );
    setImagesDone( true );

  };

  // const inputWhileFocused = {
  //   scale: 1.06,
  // };

  async function addTruck ( images_ ) {

    setAdding( true );

    console.log( truck );

    const dateParts = dateInput.split( "-" );

    [ dateParts[ 0 ], dateParts[ 2 ] ] = [ dateParts[ 2 ], dateParts[ 0 ] ];

    const due_date = dateParts.join( "-" );

    const ReqData = {
      title: truckTitle, overview: truckOverview, due_date, brand, fuel_type: fuelType, images, accessories, gearbox, energy, price_per_day: pricePerDay, commercial_power: commercialPower, fiscal_power: fiscalPower, mixed_consumption: mixedConsumption, co2_emission: co2Emission, body_type: bodyType, end_of_commercialization_date: endOfCommercializationDate, new_vehicle_price: newVehiclePrice, dimensions, weight,
    };


    if ( !truck && ( !truckTitle.trim().length || !Object.keys( imagesData ).length ) ) return setAdding( false );

    if ( type === "edit" || type == "del" ) ReqData.id = truck.id;

    try {

      const res = await fetch( type == "edit" ? API.EDIT_TRUCK : type == "new" ? API.NEW_TRUCK : API.DEL_TRUCK, {
        method: type == "edit" ? "PUT" : type == "new" ? 'POST' : "DELETE",
        body: JSON.stringify( ReqData ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        const truck = body.data[ 0 ];

        console.log( "truck: ", truck );

        setTruckID( truck.id );

        if ( type == "new" )
          await SetImages( images_, truck );
        else if ( type == "edit" )
          await SetImages_Edit( images_, truck );

        console.log( body.data );

        if ( type === "edit" ) {
          setTrucks( prevTrucks =>
            prevTrucks.map( prevTruck =>
              prevTruck.id === truck.id ? truck : prevTruck
            )
          );
        } else if ( type == "del" ) {
          setTrucks( prevTrucks =>
            prevTrucks.filter( prevTruck =>
              prevTruck.id != ReqData.id
            )
          );
        } else {
          setTrucks( prev => [ truck, ...prev ] );
        }

        handleClose();
      }

    } catch ( e ) {
      console.log( e );
    } finally {
      setAdding( false );
    }

  }

  useEffect( () => {

    console.log( accessories );

  }, [ accessories ] );

  useEffect( () => {

    console.log( "updated img data: ", imagesData );
    console.log( "updated images: ", images );

  }, [ imagesData, images ] );

  return (
    <MotionConfig transition={ { type: "spring", damping: 7 } } >
      <div className={ styles[ "add-truck" ] }>
        <div className={ styles[ "header" ] }>
          <p className={ styles[ "title" ] }>{ type === "edit" ? "Modifier le camion" : type == "new" ? "Ajouter un nouveau camion" : "Es-tu sûr?" }</p>
          <motion.button type='button' whileHover={ buttonWhileHovering( 1.2, .2 ) } className={ styles[ 'close' ] } onClick={ handleClose }>✖</motion.button>
        </div>
        {
          type != "del" && (
            <>
              <div className={ styles[ "inputs" ] }>
                <input type="text" placeholder='Titre du camion' className={ styles[ "name" ] } value={ truckTitle } onChange={ e => setTruckTitle( e.target.value ) } />
                <textarea placeholder='Description du camion' className={ styles[ "description" ] } value={ truckOverview } onChange={ e => setTruckOverview( e.target.value ) } />
              </div>

              <div className={ styles[ "infos" ] }>

                <DropDown key={ "fuelType" } setState={ setFuelType } selected={ fuelType } array={ [ "Diesel", "Petrol", "CNG", "Electric" ] } label='Carburant' dropDownOpen={ fuelDropdown } toggleDropDown={ toggleFuelDropdown } />
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

                { Dimensions.map( ( value, index ) => (

                  <div className={ styles[ value.class ] } key={ index }>
                    <label htmlFor={ value.class }>{ value.element }:</label>
                    <input onChange={ ( e ) => {
                      value.setState( e.target.value );
                    } } value={ value.value } type={ value.type } name={ value.class } id={ value.class } className={ styles[ value.inputClass ] } />
                  </div>

                ) ) }

                { Weights.map( ( value, index ) => (

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
                    { Object.keys( imagesData ).map( ( img, key ) => (
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
                          onClick={ ( e ) => handleDelete( e, key ) }
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
            onClick={ e => {
              addTruck( imagesData );
            } }
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
        </div>
      </div>
    </MotionConfig>
  );
};

export default AddTruck;
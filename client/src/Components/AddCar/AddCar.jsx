import { useEffect, useMemo, useState } from 'react';
import styles from "./AddCar.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import { useCars } from '../../Contexts/CarsContext';
import { API } from '../../Constants';
import { BreakSpan } from '../Card/Card';
import { v4 as uid } from "uuid";
import { uploadFile, updateData, deleteFile } from "../../Supabase";


const AddCar = ( { handleClose, type = "new", car } ) => {

  // const navigate = useNavigate();
  const { setCars, brands } = useCars();
  const [ carID, setCarID ] = useState( car?.id || 0 );
  const [ adding, setAdding ] = useState( false );
  const [ carTitle, setCarTitle ] = useState( car?.title || "" );
  const [ carOverview, setCarOverview ] = useState( car?.overview || "" );
  const [ brand, setBrand ] = useState( car?.brand || undefined );
  const [ fuelType, setFuelType ] = useState( car?.fuel_type || "" );
  const [ pricePerDay, setPricePerDay ] = useState( car?.price_per_day || 0 );
  const [ pricePerMonth, setPricePerMonth ] = useState( car?.price_per_month || 0 );
  const [ mileage, setMilage ] = useState( car?.milage || "" );
  const [ energy, setEnergy ] = useState( car?.energy || "" );
  const [ guarantee, setGuarantee ] = useState( car?.guarantee || "" );
  const [ color, setColor ] = useState( car?.color || "" );
  const [ certificate, setCertificate ] = useState( car?.certificate || "" );
  const [ emission, setEmission ] = useState( car?.emission || "" );
  const [ modelYear, setModelYear ] = useState( car?.modelYear || "" );
  const [ seatingCapacity, setSeatingCapacity ] = useState( car?.seating_capacity || "" );
  const [ gearbox, setGearbox ] = useState( car?.gearbox || "" );
  const [ accessories, setAccessories ] = useState( car?.accessories || [] );
  const [ fuelDropdown, toggleFuelDropdown ] = useState( false );
  const [ brandDropdown, toggleBrandDropdown ] = useState( false );

  const [ images, setImages ] = useState( car?.images || [] );
  const [ imagesData, setImagesData ] = useState( {} );
  const [ imagesDone, setImagesDone ] = useState( false );

  const Accessories = useMemo( () => [ "Air Conditioner", "Power Door Locks", "AntiLock Braking System", "Brake Assist", "Power Steering", "Driver Airbag", "Passenger Airbag", "Power Windows", "CD Player", "Central Locking", "Crash Sensor", "Leather Seats", "Bluetooth", "Rear View Camera", "Automatic" ], [] );

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
      element: "Price / Day (USD)",
      class: "price-per-day",
      inputClass: "price-per-day-input",
      setState: setPricePerDay,
      value: pricePerDay,
      type: "number"
    },
    {
      element: "Price / Month (USD)",
      class: "price-per-month",
      inputClass: "price-per-month-input",
      setState: setPricePerMonth,
      value: pricePerMonth,
      type: "number"
    },
    {
      element: "Mileage",
      class: "mileage",
      inputClass: "mileage-input",
      setState: setMilage,
      value: mileage,
      type: "number"
    },
    {
      element: "Energy",
      class: "energy",
      inputClass: "energy-input",
      setState: setEnergy,
      value: energy,
      type: "text"
    },
    {
      element: "Guarantee",
      class: "guarantee",
      inputClass: "guarantee-input",
      setState: setGuarantee,
      value: guarantee,
      type: "text"
    },
    {
      element: "Color",
      class: "color",
      inputClass: "color-input",
      setState: setColor,
      value: color,
      type: "text"
    },
    {
      element: "Certificate",
      class: "certificate",
      inputClass: "certificate-input",
      setState: setCertificate,
      value: certificate,
      type: "text"
    },
    {
      element: "Emission",
      class: "emission",
      inputClass: "emission-input",
      setState: setEmission,
      value: emission,
      type: "text"
    },
    {
      element: "Model Year",
      class: "model-year",
      inputClass: "model-year-input",
      setState: setModelYear,
      value: modelYear,
      type: "text"
    },
    {
      element: "Seating Capacity",
      class: "seating-capacity",
      inputClass: "seating-capacity-input",
      setState: setSeatingCapacity,
      value: seatingCapacity,
      type: "number"
    },
    {
      element: "Gearbox",
      class: "gearbox",
      inputClass: "gearbox-input",
      setState: setGearbox,
      value: gearbox,
      type: "text"
    }
  ], [ pricePerDay, pricePerMonth, mileage, energy, guarantee, color, certificate, emission, modelYear, seatingCapacity, gearbox ] );


  // const [ priorityInput, setPriorityInput ] = useState( "" );
  // const [ assigneeInput, setAssigneeInput ] = useState( "" );
  // const [ reporterInput, setReporterInput ] = useState( "" );
  const currentDate = new Date();
  const [ dateInput, setDateInput ] = useState( `${ currentDate.getFullYear() }-${ currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : "0" + ( currentDate.getMonth() + 1 ) }-${ currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate() }` );


  useEffect( () => {

    let IMG_OBJECT =
      type == "edit"
        ? [ ...car?.images ]?.reduce( ( p, c ) => {
          p[ c ] = c;
          return p;
        }, {} )
        : {};

    console.log( "car.imgs from line 165: ", car?.images );
    setImagesData( IMG_OBJECT );

  }, [] );

  useEffect( () => console.log( "img obj:  ", imagesData ), [ imagesData ] );

  useEffect( () => {

    if ( type == "edit" ) {
      setImagesData( {
        ...[ ...car?.images || images ]?.reduce( ( p, c ) => {
          p[ c ] = c;
          return p;
        }, {} ),
      } );
    }
    console.log( car );

  }, [ car ] );

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


  const SetImages = async ( images_, Car ) => {

    let imageArray = [];

    for ( let image in images_ ) {

      let fileId = uid();
      let extension = images_[ image ].type.replace( "image/", "" ).toLowerCase();

      imageArray.push(
        `${ process.env.REACT_APP_SUPABASE_URL }/storage/v1/object/public/images/users/${ Car.id }/${ fileId }.${ extension }`
      );

      await uploadFile(
        Car.id,
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

      // const res = await fetch( API.EDIT_CAR, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify( ReqData )
      // } );

      console.log( "casasasar: ", car );
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
  //         `https://lmxqvapkmczkpcfheiun.supabase.co/storage/v1/object/public/images/users/${ postID }/${ fileId }.${ extension }`
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

        await updateData( {
          table: "Cars",
          where: {
            id: carID
          },
          object: {
            images
          }
        } ).then( console.log );

      } )();
    }
  }, [ images, imagesDone ] );


  const getMissingImages = ( imagesArray, obj ) => {
    const objKeysSet = new Set( Object.keys( obj ) );
    return imagesArray.filter( ( image ) => !objKeysSet.has( image ) );
  };

  const SetImages_Edit = async ( images_, car ) => {
    setImagesDone( false );
    const imageArray = [];
    const deletedImages = getMissingImages( car.images, images_ );

    for ( let image in images_ ) {
      if ( typeof images_[ image ] !== "string" ) {
        const fileId = uid();
        const extension = images_[ image ].type.replace( "image/", "" ).toLowerCase();

        imageArray.push(
          `${ process.env.REACT_APP_SUPABASE_URL }/storage/v1/object/public/images/users/${ car.id }/${ fileId }.${ extension }`
        );
        await uploadFile(
          car.id,
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
        await deleteFile( `users/${ car.id }/${ fileID }` );
      }
    }

    let _car = car;
    _car.images = imageArray;

    setImages( ( prev ) => ( [ ...imageArray ] ) );
    setImagesDone( true );

  };

  // const inputWhileFocused = {
  //   scale: 1.06,
  // };

  async function addCar ( images_ ) {

    setAdding( true );

    const dateParts = dateInput.split( "-" );

    [ dateParts[ 0 ], dateParts[ 2 ] ] = [ dateParts[ 2 ], dateParts[ 0 ] ];

    const due_date = dateParts.join( "-" );

    const ReqData = {
      title: carTitle, overview: carOverview, due_date, brand, fuel_type: fuelType, images, accessories, certificate, color, gearbox, emission, energy, mileage, guarantee, seating_capacity: seatingCapacity, model_year: modelYear, price_per_day: pricePerDay, price_per_month: pricePerMonth
    };


    if ( !carTitle.trim().length || !Object.keys( imagesData ).length ) return setAdding( false );

    if ( type === "edit" || type == "del" ) ReqData.id = car.id;

    try {

      const res = await fetch( type == "edit" ? API.EDIT_CAR : type == "new" ? API.NEW_CAR : API.DEL_CAR, {
        method: type == "edit" ? "PUT" : type == "new" ? 'POST' : "DELETE",
        body: JSON.stringify( ReqData ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        const car = body.data[ 0 ];

        setCarID( car.id );

        if ( type == "new" )
          await SetImages( images_, car );
        else if ( type == "edit" )
          await SetImages_Edit( images_, car );

        console.log( body.data );

        if ( type === "edit" ) {
          setCars( prevCars =>
            prevCars.map( prevCar =>
              prevCar.id === car.id ? car : prevCar
            )
          );
        } else if ( type == "del" ) {
          setCars( prevCars =>
            prevCars.filter( prevCar =>
              prevCar.id != ReqData.id
            )
          );
        } else {
          setCars( prev => [ car, ...prev ] );
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
      <div className={ styles[ "add-car" ] }>
        <div className={ styles[ "header" ] }>
          <p className={ styles[ "title" ] }>{ type === "edit" ? "Edit Your Car" : type == "new" ? "Add New Car" : "Are You Sure?" }</p>
          <motion.button type='button' whileHover={ buttonWhileHovering( 1.2, .2 ) } className={ styles[ 'close' ] } onClick={ handleClose }>✖</motion.button>
        </div>
        {
          type != "del" && (
            <>
              <div className={ styles[ "inputs" ] }>
                <input type="text" placeholder='Car Title' className={ styles[ "name" ] } value={ carTitle } onChange={ e => setCarTitle( e.target.value ) } />
                <textarea placeholder='Car Overview' className={ styles[ "description" ] } value={ carOverview } onChange={ e => setCarOverview( e.target.value ) } />
              </div>

              <div className={ styles[ "infos" ] }>

                <DropDown key={ "fuelType" } setState={ setFuelType } selected={ fuelType } array={ [ "Diesel", "Petrol", "CNG" ] } label='Fuel Type' dropDownOpen={ fuelDropdown } toggleDropDown={ toggleFuelDropdown } />
                <DropDown key={ "brand" } setState={ setBrand } selected={ brand } array={ brands?.map( ( brand ) => brand.brandName ) } backWorkArray={ brands?.map( brand => brand.id ) } label='Brand' dropDownOpen={ brandDropdown } toggleDropDown={ toggleBrandDropdown } />

                { data.map( ( value, index ) => (

                  <div className={ styles[ value.class ] } key={ index }>
                    <label htmlFor={ value.class }>{ value.element }:</label>
                    <input onChange={ ( e ) => {
                      value.setState( e.target.value );
                    } } value={ value.value } type={ value.type } name={ value.class } id={ value.class } className={ styles[ value.inputClass ] } />
                  </div>

                ) ) }

                <div className={ styles[ "accessories" ] }>
                  <label htmlFor="accessories">Accessories:</label>
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
                    Select Images
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
                          x
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
              addCar( imagesData );
            } }
            disabled={ adding }
          >
            { adding ? type == 'new' ? "Adding..." : type == "edit" ? "Updating..." : "Deleting..." : type == 'new' ? "Add" : type == "edit" ? "Update" : "Delete" }
          </motion.button>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "cancel-button" ] }
            onClick={ handleClose }
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </MotionConfig>
  );
};

export default AddCar;
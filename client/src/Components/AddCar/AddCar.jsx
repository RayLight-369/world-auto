import { useEffect, useMemo, useState } from 'react';
import styles from "./AddCar.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import { useCars } from '../../Contexts/CarsContext';


const AddCar = ( { handleClose, type = "new" } ) => {

  // const navigate = useNavigate();
  const { setCars, brands } = useCars();

  const [ adding, setAdding ] = useState( false );
  const [ carTitle, setCarTitle ] = useState( "" );
  const [ carOverview, setCarOverview ] = useState( "" );
  const [ brand, setBrand ] = useState( "" );
  const [ fuelType, setFuelType ] = useState( "" );
  const [ pricePerDay, setPricePerDay ] = useState( 0 );
  const [ pricePerMonth, setPricePerMonth ] = useState( 0 );
  const [ mileage, setMilage ] = useState( "" );
  const [ energy, setEnergy ] = useState( "" );
  const [ guarantee, setGuarantee ] = useState( "" );
  const [ color, setColor ] = useState( "" );
  const [ certificate, setCertificate ] = useState( "" );
  const [ emission, setEmission ] = useState( "" );
  const [ modelYear, setModelYear ] = useState( "" );
  const [ seatingCapacity, setSeatingCapacity ] = useState( "" );
  const [ gearbox, setGearbox ] = useState( "" );
  const [ accessories, setAccessories ] = useState( [] );
  const access = [ "Air Conditioner", "Power Door Locks", "AntiLock Braking System", "Brake Assist", "Power Steering", "Driver Airbag", "Passenger Airbag", "Power Windows", "CD Player", "Central Locking", "Crash Sensor", "Leather Seats" ];
  const [ fuelDropdown, toggleFuelDropdown ] = useState( false );
  const [ brandDropdown, toggleBrandDropdown ] = useState( false );

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
      element: "Price / Day",
      class: "price-per-day",
      inputClass: "price-per-day-input",
      setState: setPricePerDay,
      value: pricePerDay,
      type: "number"
    },
    {
      element: "Price / Month",
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
      type: "text"
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


  const buttonWhileHovering = ( scale = 1.1, duration = .1 ) => ( {
    scale,
    transition: {
      duration
    }
  } );

  // const inputWhileFocused = {
  //   scale: 1.06,
  // };

  async function addCar () {

    setAdding( true );

    const dateParts = dateInput.split( "-" );

    [ dateParts[ 0 ], dateParts[ 2 ] ] = [ dateParts[ 2 ], dateParts[ 0 ] ];

    const due_date = dateParts.join( "-" );

    const ReqData = {
      title: carTitle, overview: carOverview, due_date, brand, fuel_type: fuelType, accessories, certificate, color, gearbox, emission, energy, mileage, guarantee, seating_capacity: seatingCapacity, model_year: modelYear, price_per_day: pricePerDay, price_per_month: pricePerMonth
    };


    if ( !carTitle.trim().length ) return;

    try {

      const res = await fetch( "https://world-auto-api.vercel.app/admin/cars", {
        method: 'POST',
        body: JSON.stringify( ReqData ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        console.log( body.data );

        setCars( prev => [ body.data[ 0 ], ...prev ] );

        handleClose();
      }

    } catch ( e ) {
      console.log( e );
    } finally {
      setAdding( false );
    }

  }

  return (
    <MotionConfig transition={ { type: "spring", damping: 7 } } >
      <div className={ styles[ "add-car" ] }>
        <div className={ styles[ "header" ] }>
          <p className={ styles[ "title" ] }>Add New Car</p>
          <motion.button type='button' whileHover={ buttonWhileHovering( 1.2, .2 ) } className={ styles[ 'close' ] } onClick={ handleClose }>✖</motion.button>
        </div>

        <div className={ styles[ "inputs" ] }>
          <input type="text" placeholder='Car Title' className={ styles[ "name" ] } value={ carTitle } onChange={ e => setCarTitle( e.target.value ) } />
          <textarea placeholder='Car Overview' className={ styles[ "description" ] } value={ carOverview } onChange={ e => setCarOverview( e.target.value ) } />
        </div>

        <div className={ styles[ "infos" ] }>

          <DropDown key={ "fuelType" } setState={ setFuelType } array={ [ "Diesel", "Petrol", "CNG" ] } label='Fuel Type' dropDownOpen={ fuelDropdown } toggleDropDown={ toggleFuelDropdown } />
          <DropDown key={ "brand" } setState={ setBrand } array={ brands?.map( ( brand ) => brand.brandName ) } label='Brand' dropDownOpen={ brandDropdown } toggleDropDown={ toggleBrandDropdown } />

          { data.map( ( value, index ) => (

            <div className={ styles[ value.class ] } key={ index }>
              <label htmlFor={ value.class }>{ value.element }:</label>
              <input onChange={ ( e ) => {
                value.setState( e.target.value );
              } } value={ value.value } type={ value.type } name={ value.class } id={ value.class } className={ styles[ value.inputClass ] } />
            </div>

          ) ) }

        </div>
        <div className={ styles[ "buttons" ] }>
          <motion.button
            whileHover={ buttonWhileHovering( 1.1, .2 ) }
            className={ styles[ "add-button" ] }
            onClick={ addCar }
            disabled={ adding }
          >
            { adding ? "Adding..." : "Add" }
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
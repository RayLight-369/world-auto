import { useState } from 'react';
import styles from "./AddCar.module.css";
import { MotionConfig, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';


const AddCar = ( { handleClose } ) => {

  const navigate = useNavigate();
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
      title: carTitle, overview: carOverview, due_date, brand, fuelType, accessories, certificate, color, gearbox, emission, energy, mileage, guarantee, seating_capacity: seatingCapacity, model_year: modelYear, price_per_day: pricePerDay, price_per_month: pricePerMonth
    };


    if ( !carTitle.trim().length ) return;

    try {

      const res = await fetch( "https://world-auto-api.vercel.app/admin/cars/", {
        method: 'POST',
        body: JSON.stringify( ReqData ),
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( res.ok ) {
        const body = await res.json();
        console.log( body );
        // set_data_after_creating( session.user.email, setData, body ).then( ( { sessionData } ) => {
        //   navigateTo( sessionData, {
        //     teamId: currentTeam.teamID,
        //     channelId: currentChannel.id,
        //     setCurrentTeam,
        //     setCurrentChannel,
        //     setCurrentChannelTasks
        //   } );
        // } );



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
      <div className={ styles[ "add-task" ] }>
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
          <DropDown key={ "brand" } setState={ setBrand } array={ [ "Honda", "Toyota", "Suzuki" ] } label='Brand' dropDownOpen={ brandDropdown } toggleDropDown={ toggleBrandDropdown } />
          <div className={ styles[ "due-date" ] }>
            <label htmlFor="dueDateInput">Due Date:</label>
            <input onChange={ ( e ) => {
              setDateInput( e.target.value );
            } } value={ dateInput } type="date" name="dueDateInput" id="dueDateInput" className={ styles[ 'due-date-input' ] } placeholder='dd-mm-yyyy' />
          </div>
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
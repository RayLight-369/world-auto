import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { createContext, useContext, useEffect, useState } from 'react';
import { exists, getData, insertData } from '../Supabase';
import Cookies from "js-cookie";


const SessionUserContext = createContext();

export const useUser = () => {
  return useContext( SessionUserContext );
};

const SessionUserProvider = ( { children } ) => {

  const [ sessionStored ] = useState( ( sessionStorage.getItem( "user" ) && JSON.parse( sessionStorage.getItem( "user" ) ) ) || ( Cookies.get( "user" ) && JSON.parse( Cookies.get( "user" ) ) ) || null );
  const [ user, setUser ] = useState( null );
  const [ isLoggedIn, setIsLoggedIn ] = useState( !!sessionStored );


  const setUserBasedOnEmail = async ( email, name, picture ) => {

    const userExists = await exists( {
      table: "Users",
      where: {
        email: email
      }
    } );

    if ( !userExists ) {
      const { data } = await insertData( {
        table: "Users",
        object: {
          email: email,
          name: name,
          image: picture
        }
      } );

      if ( data ) {
        setUser( data[ 0 ] );
      }
    } else {
      const { data } = await getData( {
        table: "Users",
        where: {
          email
        }
      } );

      if ( data ) {
        setUser( data[ 0 ] );
      }
    }

  };



  const Login = useGoogleLogin( {
    onSuccess: async ( tokenResponse ) => {
      const res = await fetch( `https://www.googleapis.com/oauth2/v3/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ tokenResponse.access_token }`,
        },
      } );

      if ( res.ok ) {
        const body = await res.json();
        setIsLoggedIn( true );

        sessionStorage.setItem( "user", JSON.stringify( body ) );

        Cookies.set( "user", JSON.stringify( body ), {
          expires: 7
        } );

        setUserBasedOnEmail( body.email, body.name, body.picture );
      }
    },
    onError: ( error ) => console.log( 'Login Failed:', error ),
  } );

  const Logout = () => {
    googleLogout();
    setUser( null );
    sessionStorage.setItem( "user", null );
    Cookies.remove( "user" );
    setIsLoggedIn( false );
    console.log( 'User logged out' );
  };


  useEffect( () => {

    if ( sessionStored ) {
      setUserBasedOnEmail( sessionStored.email, sessionStored.name, sessionStored.picture );
    }

  }, [] );

  return (
    <SessionUserContext.Provider value={ { user, isLoggedIn, setIsLoggedIn, setUser, Login, Logout } }>{ children }</SessionUserContext.Provider>
  );
};

export default SessionUserProvider;
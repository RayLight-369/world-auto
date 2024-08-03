import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { createContext, useContext, useEffect, useState } from 'react';

const SessionUserContext = createContext();

export const useUser = () => {
  return useContext( SessionUserContext );
};

const SessionUserProvider = ( { children } ) => {

  const [ user, setUser ] = useState( JSON.parse( sessionStorage.getItem( "user" ) ) || null );
  const [ isLoggedIn, setIsLoggedIn ] = useState( !!user );

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
        setUser( body );
        setIsLoggedIn( true );
        sessionStorage.setItem( "user", JSON.stringify( body ) );
      }
    },
    onError: ( error ) => console.log( 'Login Failed:', error ),
  } );

  const Logout = () => {
    googleLogout();
    setUser( null );
    sessionStorage.setItem( "user", null );
    setIsLoggedIn( false );
    console.log( 'User logged out' );
  };


  useEffect( () => {

    if ( !user ) {
      setIsLoggedIn( false );
    }

  }, [ user ] );

  return (
    <SessionUserContext.Provider value={ { user, isLoggedIn, setIsLoggedIn, setUser, Login, Logout } }>{ children }</SessionUserContext.Provider>
  );
};

export default SessionUserProvider;
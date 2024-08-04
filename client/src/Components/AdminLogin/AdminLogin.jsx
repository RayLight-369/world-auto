import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import { API } from '../../Constants';
import { useNavigate } from 'react-router-dom';


const AdminLogin = ( { adminVerified, setAdminVerified } ) => {

  const navigate = useNavigate();

  const [ user, setUser ] = useState( '' );
  const [ pass, setPassword ] = useState( '' );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    // console.log( 'Email:', email );
    // console.log( 'Password:', password );
    // Add your login logic here

    try {

      const res = await fetch( API.ADMIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          user,
          pass
        } )
      } );

      if ( res.ok ) {
        const body = await res.json();

        if ( body.success ) {
          setAdminVerified( true );
          navigate( "/admin/dashboard" );
        }
      }

    } catch ( e ) {
      console.log( e );
    }
  };

  return (
    <div className={ styles.loginContainer }>
      <form className={ styles.loginForm } onSubmit={ handleSubmit }>
        <h2>Admin Login</h2>
        <div className={ styles.inputGroup }>
          <label htmlFor="email">User</label>
          <input
            type="text"
            id="email"
            value={ user }
            onChange={ ( e ) => setUser( e.target.value ) }
            required
          />
        </div>
        <div className={ styles.inputGroup }>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={ pass }
            onChange={ ( e ) => setPassword( e.target.value ) }
            required
          />
        </div>
        <button type="submit" className={ styles.loginButton }>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

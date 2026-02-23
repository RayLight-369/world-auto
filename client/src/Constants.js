export const NavLinks = [
  {
    name: "Accueil",
    path: "/"
  },
  {
    name: "Camion de location",
    path: "/trucks-rental"
  },
  {
    name: "Transports VTC",
    path: "/vtc-transport"
  },
  {
    name: "À propos",
    path: "/about"
  },
  {
    name: "Contact",
    path: "/contact"
  }
];

export const AdminLinks = [
  {
    name: "Tableau de bord",
    path: "/admin/dashboard"
  },
  {
    name: "Voitures",
    path: "/admin/cars"
  },
  {
    name: "Marques",
    path: "/admin/brands"
  },
  {
    name: "Camions",
    path: "/admin/trucks"
  },
  {
    name: "Tarifs",
    path: "/admin/rates"
  },
];

export const CREDENTIALS = {
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_ID
};

const BASE_URL = "https://world-auto-api.vercel.app";
// http://localhost:3030
export const API = {
  GET_CARS: `${ BASE_URL }/admin/cars/range`,
  GET_CAR: ( id ) => `${ BASE_URL }/admin/cars/${ id }`,
  NEW_CAR: `${ BASE_URL }/admin/cars/new`,
  EDIT_CAR: `${ BASE_URL }/admin/cars/edit`,
  DEL_CAR: `${ BASE_URL }/admin/cars/delete`,
  GET_TRUCKS: `${ BASE_URL }/admin/trucks/range`,
  GET_TRUCK: ( id ) => `${ BASE_URL }/admin/trucks/${ id }`,
  NEW_TRUCK: `${ BASE_URL }/admin/trucks/new`,
  EDIT_TRUCK: `${ BASE_URL }/admin/trucks/edit`,
  DEL_TRUCK: `${ BASE_URL }/admin/trucks/delete`,
  GET_BRANDS: `${ BASE_URL }/admin/brands`,
  NEW_BRAND: `${ BASE_URL }/admin/brands/new`,
  EDIT_BRAND: `${ BASE_URL }/admin/brands/edit`,
  DEL_BRAND: `${ BASE_URL }/admin/brands/delete`,
  GET_RATES: `${ BASE_URL }/admin/rates`,
  NEW_RATE: `${ BASE_URL }/admin/rates/new`,
  EDIT_RATE: `${ BASE_URL }/admin/rates/edit`,
  DEL_RATE: `${ BASE_URL }/admin/rates/delete`,
  CONTACT_EMAIL: `${ BASE_URL }/admin/contact`,
  ADMIN: `${ BASE_URL }/admin`
};

export const getFormattedNumber = ( formattedNumber ) => parseInt( formattedNumber?.replace( /,/g, '' ), 10 ) || formattedNumber;
export const formatNumber = ( num ) => {
  if ( !isNaN( num ) ) {
    return ( +num ).toLocaleString( "en-US" );
  } else {
    return num;
  }
};

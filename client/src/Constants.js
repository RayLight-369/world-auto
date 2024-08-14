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

export const API = {
  GET_CARS: `https://world-auto-api.vercel.app/admin/cars/range`,
  GET_CAR: ( id ) => `https://world-auto-api.vercel.app/admin/cars/${ id }`,
  NEW_CAR: `https://world-auto-api.vercel.app/admin/cars/new`,
  EDIT_CAR: `https://world-auto-api.vercel.app/admin/cars/edit`,
  DEL_CAR: `https://world-auto-api.vercel.app/admin/cars/delete`,
  GET_TRUCKS: `https://world-auto-api.vercel.app/admin/trucks/range`,
  GET_TRUCK: ( id ) => `https://world-auto-api.vercel.app/admin/trucks/${ id }`,
  NEW_TRUCK: `https://world-auto-api.vercel.app/admin/trucks/new`,
  EDIT_TRUCK: `https://world-auto-api.vercel.app/admin/trucks/edit`,
  DEL_TRUCK: `https://world-auto-api.vercel.app/admin/trucks/delete`,
  GET_BRANDS: `https://world-auto-api.vercel.app/admin/brands`,
  NEW_BRAND: `https://world-auto-api.vercel.app/admin/brands/new`,
  EDIT_BRAND: `https://world-auto-api.vercel.app/admin/brands/edit`,
  DEL_BRAND: `https://world-auto-api.vercel.app/admin/brands/delete`,
  GET_RATES: `https://world-auto-api.vercel.app/admin/rates`,
  NEW_RATE: `https://world-auto-api.vercel.app/admin/rates/new`,
  EDIT_RATE: `https://world-auto-api.vercel.app/admin/rates/edit`,
  DEL_RATE: `https://world-auto-api.vercel.app/admin/rates/delete`,
  CONTACT_EMAIL: `https://world-auto-api.vercel.app/admin/contact`,
  ADMIN: `https://world-auto-api.vercel.app/admin`
};

// https://world-auto-api.vercel.app/admin/contact
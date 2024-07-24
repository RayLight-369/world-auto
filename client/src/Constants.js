export const NavLinks = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "/about"
  },
  {
    name: "Contact",
    path: "/contact"
  }
];

export const AdminLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard"
  },
  {
    name: "Manage Cars",
    path: "/admin/cars"
  },
  {
    name: "Manage Brands",
    path: "/admin/brands"
  },
];

export const API = {
  GET_CARS: `https://world-auto-api.vercel.app/admin/cars`,
  NEW_CAR: `https://world-auto-api.vercel.app/admin/cars/new`,
  EDIT_CAR: `https://world-auto-api.vercel.app/admin/cars/edit`,
  GET_BRANDS: `https://world-auto-api.vercel.app/admin/brands`,
  NEW_BRAND: `https://world-auto-api.vercel.app/admin/brands/new`,
  EDIT_BRAND: `https://world-auto-api.vercel.app/admin/brands/edit`,
  DEL_BRAND: `https://world-auto-api.vercel.app/admin/brands/delete`,
};
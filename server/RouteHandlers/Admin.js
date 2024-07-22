const { insertData } = require( "../Supabase" );
const CarRouter = require( "./Cars" );
const BrandsRouter = require( "./Brands" );
const router = require( "express" ).Router();
const cors = require( "cors" );

router.use( cors( {
  origin: "https://world-auto.vercel.app"
} ) );

router.use( "/cars", CarRouter );
router.use( "/brands", BrandsRouter );

router.get( "/", ( _, res ) => res.send( "Hello, world! from Admin" ) );


module.exports = router;
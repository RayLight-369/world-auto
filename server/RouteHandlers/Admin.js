const { insertData } = require( "../Supabase" );
const CarRouter = require( "./Cars" );
const BrandsRouter = require( "./Brands" );
const router = require( "express" ).Router();


router.use( "/cars", CarRouter );
router.use( "/brands", BrandsRouter );

router.get( "/", ( _, res ) => res.send( "Hello, world! from Admin" ) );


module.exports = router;
const { insertData } = require( "../Supabase" );
const CarRouter = require( "./Cars" );
const router = require( "express" ).Router();


router.use( "/cars", CarRouter );

router.get( "/", ( _, res ) => res.send( "Hello, world! from Admin" ) );


module.exports = router;
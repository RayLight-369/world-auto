const { insertData, getData } = require( "../Supabase" );

const router = require( "express" ).Router();

router.get( "/", async ( req, res ) => {
  try {

    const { data } = await getData( {
      table: "Cars"
    } );

    if ( data ) res.status( 200 ).json( { data } );
    res.status( 404 ).json( { error: "No Cars Found!" } );

  } catch ( e ) {
    res.status( 500 ).json( { error: e } );
  }
} );

router.post( "/", async ( req, res ) => {

  try {

    const object = await req.body;

    const data = await insertData( {
      table: "Cars",
      object
    } );

    if ( data.error ) {
      res.status( data.status ).json( { error: data.error } );
    }

    res.status( data.status ).json( { msg: "Successfully added a new Car!" } );

  } catch ( e ) {
    res.status( 500 ).json( { error: e } );
  }

} );








module.exports = router;
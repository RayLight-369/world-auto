const { insertData, getData, updateData } = require( "../Supabase" );

const router = require( "express" ).Router();
const cors = require( "cors" );

router.use( cors() );
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
    console.log( object );

    const data = await insertData( {
      table: "Cars",
      object
    } );

    if ( data.error ) {
      res.status( data.status ).json( { error: data.error } );
    }

    res.status( data.status ).json( { data: data.data } );

  } catch ( e ) {
    res.status( 500 ).json( { error: e } );
  }

} );

router.put( "/", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const data = await updateData( {
      table: "Cars",
      where: {
        id: object.id
      },
      object
    } );

    if ( data.error ) {
      res.status( data.status ).json( { error: data.error } );
    }

    res.status( data.status ).json( { data: data.data } );

  } catch ( e ) {
    res.status( 500 ).json( { error: e } );
  }

} );








module.exports = router;
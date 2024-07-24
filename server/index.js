require( "dotenv" ).config();

const http = require( "http" );
const app = require( "express" )();
const server = http.createServer( app );
const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );
const { log } = console;
const cors = require( "cors" );

const { insertData, getData, updateData, deleteData } = require( "./Supabase" );



// const AdminRouter = require( "./RouteHandlers/Admin" );


// app.use( ( req, res, next ) => {
//   const corsWhitelist = [
//     'https://domain1.example',
//     'https://domain2.example',
//     'https://domain3.example'
//   ];
//   if ( corsWhitelist.indexOf( req.headers.origin ) !== -1 ) {
//     res.header( 'Access-Control-Allow-Origin', req.headers.origin );
//     res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
//   }
//   res.head

//   next();
// } );


// app.use( ( req, res, next ) => {

//   res.setHeader( "Access-Control-Allow-Origin", "*" );
//   next();

// } );

app.use( cors() );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser() );

// app.use( "/admin", AdminRouter );

app.get( "/", ( _, res ) => res.send( "Hello, world!" ) );

// router.use( cors( {
//   origin: "https://world-auto.vercel.app"
// } ) );

app.get( [ "/admin/cars", "/admin/cars/:id" ], async ( req, res ) => {
  try {

    const id = req?.params?.id;
    const query = { table: "Cars" };

    if ( id ) query.where = { id };

    const { data, error } = await getData( query );

    if ( data ) res.status( 200 ).json( { data } );
    else {
      console.log( error );
      res.status( 404 ).json( { error: "No Cars Found!" } );
    }

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }
} );

app.post( "/admin/cars/new", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const data = await insertData( {
      table: "Cars",
      object
    } );

    if ( data.error ) {

      console.log( data.error );
      res.status( data.status ).json( { error: data.error } );

    } else res.status( data.status ).json( { data: data.data } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );

app.put( "/admin/cars/edit", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const Data = await updateData( {
      table: "Cars",
      where: {
        id: object.id
      },
      object
    } );

    if ( Data.error ) {

      console.log( Data.error );
      res.status( Data.status ).json( { error: Data.error } );

    } else res.status( Data.status ).json( { data: Data.data } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );

app.put( "/admin/cars/delete", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const Data = await deleteData( {
      table: "Cars",
      where: {
        id: object.id
      }
    } );

    if ( Data.error ) {

      console.log( Data.error );
      res.status( Data.status ).json( { error: Data.error } );

    } else res.status( 200 ).json( { data: Data.data || [ object ] } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );

app.get( "/admin/brands", async ( req, res ) => {
  try {

    const { data, error } = await getData( {
      table: "Brands"
    } );

    if ( data ) res.status( 200 ).json( { data } );
    else {
      console.log( error );
      res.status( 404 ).json( { error: "No Cars Found!" } );
    }

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }
} );

app.post( "/admin/brands/new", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const data = await insertData( {
      table: "Brands",
      object
    } );

    if ( data.error ) {
      console.log( data.error );
      res.status( data.status ).json( { error: data.error } );
    } else res.status( data.status ).json( { data: data.data } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );

app.put( "/admin/brands/edit", async ( req, res ) => {

  try {

    const object = await req.body;

    console.log( "object: ", object );

    const Data = await updateData( {
      table: "Brands",
      where: {
        id: object.id
      },
      object
    } );

    if ( Data.error ) {
      console.log( Data.error );
      res.status( Data.status ).json( { error: Data.error } );
    } else res.status( Data.status ).json( { data: Data.data } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );

app.delete( "/admin/brands/delete", async ( req, res ) => {

  try {

    const object = await req.body;

    console.log( "object: ", object );

    const Data = await deleteData( {
      table: "Brands",
      where: {
        id: object.id
      }
    } );

    console.log( "object: ", Data );

    if ( Data.error ) {
      console.log( Data.error );
      res.status( Data.status ).json( { error: Data.error } );
    } else res.status( 200 ).json( { data: Data.data || [ object ] } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );



server.listen( process.env.port, () => log( `server listening on ${ process.env.port }` ) );
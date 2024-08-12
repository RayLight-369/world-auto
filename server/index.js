require( "dotenv" ).config();

const http = require( "http" );
const app = require( "express" )();
const server = http.createServer( app );
const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );
const { log } = console;
const cors = require( "cors" );
const bcrypt = require( "bcrypt" );
const { Resend } = require( "resend" );

const resend = new Resend( process.env.RESEND_KEY );

// const ENV = require( "./env.json" );


const { insertData, getData, updateData, deleteData } = require( "./Supabase" );



app.use( cors() );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser() );

// app.use( "/admin", AdminRouter );

app.get( "/", ( _, res ) => res.send( "Hello, world!" ) );

// router.use( cors( {
//   origin: "https://world-auto.vercel.app"
// } ) );

app.post( "/admin", async ( req, res ) => {

  try {

    const data = req.body;
    const user = data.user;

    const Data = await getData( {
      table: "admin",
      where: {
        user
      }
    } );

    if ( !( Data && Data.data && Data.data.length ) ) {
      res.status( 404 ).json( { error: Data.error || "No User" } );
    }

    if ( data?.pass && data?.change ) {

      const result = await bcrypt.compare( data.pass, Data.data[ 0 ].pass );
      console.log( result );

      if ( result ) {

        const Hash = await bcrypt.hash( data.pass, 10 );

        await updateData( {
          table: "admin",
          where: {
            user: user
          },
          object: {
            pass: Hash
          }
        } );

      }

    } else if ( !data?.change ) {

      const result = await bcrypt.compare( data.pass, Data.data[ 0 ].pass );

      if ( result ) {
        res.status( 200 ).json( { success: true } );
      } else {
        res.status( 401 ).json( { success: false } );
      }

    }

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).send( "Error: " + e );
  }

} );

app.get( [ "/admin/cars", "/admin/cars/:id", "/admin/cars/range/:lastindex" ], async ( req, res ) => {
  try {

    const id = req.params?.id;
    const lastIndex = req.params?.lastindex;
    const query = { table: "Cars" };

    if ( id ) query.where = { id };
    if ( lastIndex ) {
      const range = lastIndex.split( "-" ).map( item => +item );
      query.range = range;
    }

    const { data, error, remaining } = await getData( query );

    if ( data ) res.status( 200 ).json( { data, remaining } );
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

app.delete( "/admin/cars/delete", async ( req, res ) => {

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

app.get( [ "/admin/trucks", "/admin/trucks/:id" ], async ( req, res ) => {
  try {

    const id = req.params?.id;
    const query = { table: "Trucks" };

    if ( id ) query.where = { id };

    const { data, error } = await getData( query );

    if ( data ) res.status( 200 ).json( { data } );
    else {
      console.log( error );
      res.status( 404 ).json( { error: "No Trucks Found!" } );
    }

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }
} );



app.post( "/admin/trucks/new", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const data = await insertData( {
      table: "Trucks",
      object
    } );

    console.log( data );

    if ( data.error ) {

      console.log( data.error );
      res.status( data.status ).json( { error: data.error } );

    } else res.status( data.status ).json( { data: data.data } );

  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }

} );

app.put( "/admin/trucks/edit", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const Data = await updateData( {
      table: "Trucks",
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

app.delete( "/admin/trucks/delete", async ( req, res ) => {

  try {

    const object = await req.body;
    console.log( object );

    const Data = await deleteData( {
      table: "Trucks",
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

app.post( "/admin/contact", async ( req, res ) => {
  const body = req.body;
  try {
    const { data, error } = await resend.emails.send( {
      from: "WorldAuto <buttrafay980@gmail.com>",
      to: [ body.email ],
      subject: "hello Ray",
      html: "<strong>it works!</strong>",
    } );

    if ( error ) {
      return res.status( 400 ).json( { error } );
    }

    res.status( 200 ).json( { data } );
  } catch ( e ) {
    console.log( e );
    res.status( 500 ).json( { error: e } );
  }
} );



server.listen( process.env.port, () => log( `server listening on ${ process.env.port }` ) );
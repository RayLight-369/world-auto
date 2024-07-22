require( "dotenv" ).config();

const http = require( "http" );
const app = require( "express" )();
const server = http.createServer( app );
const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );
const { log } = console;
const cors = require( "cors" );


const AdminRouter = require( "./RouteHandlers/Admin" );


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

app.use( "/admin", AdminRouter );

app.get( "/", ( _, res ) => res.send( "Hello, world!" ) );





server.listen( process.env.port, () => log( `server listening on ${ process.env.port }` ) );
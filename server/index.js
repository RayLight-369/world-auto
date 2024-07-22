require( "dotenv" ).config();

const http = require( "http" );
const app = require( "express" )();
const server = http.createServer( app );
const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );
const { log } = console;
const cors = require( "cors" );


const AdminRouter = require( "./RouteHandlers/Admin" );


app.use( cors() );

app.use( ( req, res, next ) => {

  res.setHeader( "Access-Control-Allow-Origin", "*" );
  next();

} );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser() );
app.use( "/admin", AdminRouter );

app.get( "/", ( req, res ) => res.send( "Hello, world!" ) );





server.listen( process.env.port, () => log( `server listening on ${ process.env.port }` ) );
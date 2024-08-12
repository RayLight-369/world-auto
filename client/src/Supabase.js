const { createClient } = require( '@supabase/supabase-js' );

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient( supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
} );



const getData = async ( {
  table,
  range,
  columns = [],
  where = {},
  contains = {},
  orderBy = {
    property: 'id',
    ascending: false
  }
} ) => {

  try {

    if ( Array.isArray( columns ) ) {
      columns = columns.join( "," );
    }

    let Data = supabase
      .from( table )
      .select( columns, { count: "exact" } )
      .match( where )
      .order( orderBy.property, { ascending: orderBy.ascending } );

    if ( range && range.length === 2 ) {
      Data.range( range[ 0 ], range[ 1 ] );
    }

    if ( Object.keys( contains ).length ) {
      for ( let key in contains ) {
        Data.ilike( key, `%${ contains[ key ].join( "%" ) }%` );
      }
    }

    let { data, error, statusText, count, status } = await Data;

    return { data, statusText, error, status, remaining: count };

  } catch ( error ) {

    console.log( error );

  }

  return false;

};

const insertData = async ( {
  table,
  object
} ) => {

  try {

    const { data, error, statusText, status } = await supabase
      .from( table )
      .insert( object )
      .select();

    return { data, error, statusText, status };

  } catch ( error ) {

    console.log( error );

  }

  return false;

};

const updateData = async ( {
  table,
  object,
  where
} ) => {

  try {

    let Data = await supabase
      .from( table )
      .update( object )
      .match( where )
      .select();


    return { data: Data.data, status: Data.status, error: Data.error };

  } catch ( error ) {

    console.log( error );

  }

  return false;

};

const exists = async ( {
  table,
  where,
  columns = []
} ) => {
  try {

    if ( Array.isArray( columns ) ) {
      columns = columns.join( "," );
    }

    let { data, error } = await supabase
      .from( table )
      .select( columns )
      .match( where );

    return !!data?.length;

  } catch ( e ) {
    console.log( e );
  }

  return false;
};

const deleteData = async ( {
  table,
  where,
} ) => {
  try {
    const { data, error, statusText, status } = await supabase
      .from( table )
      .delete()
      .match( where );

    return { data, error, statusText, status };
  } catch ( e ) {
    console.log( e );
  }

  return false;
};

const uploadFile = async ( postID, id, file, type = "users" ) => {

  try {

    supabase.storage
      .from( "images" )
      .upload( `${ type }/${ postID }/${ id }`, file, {
        cacheControl: '3600',
        upsert: false
      } ).then( console.log );

  } catch ( e ) {

    console.log( e );

  }

};

const getFile = ( FolderPath, id ) => {

  let { data: { publicUrl: src } } = supabase.storage.from( `images/${ FolderPath }` ).getPublicUrl( id );

  return src;

};

const deleteFile = async ( path ) => {

  let { data } = await supabase.storage.from( `images` ).remove( [ `${ path }` ] );

  return data;

};

const deleteAllFiles = async ( FolderPath ) => {
  let { data: list } = await supabase.storage.from( `images` ).list( FolderPath );
  const filesToDelete = list.map( file => `${ FolderPath }/${ file.name }` );
  const { data, error } = await supabase.storage.from( "images" ).remove( filesToDelete );
  return data;
};

module.exports = {
  getData,
  insertData,
  updateData,
  deleteData,
  uploadFile,
  deleteFile,
  exists,
  getFile,
};
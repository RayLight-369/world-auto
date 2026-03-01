import { uploadFile, deleteFile } from "../Supabase";
import { v4 as uid } from "uuid";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;

export const extractFileIdFromUrl = ( url ) => {
  const parts = url.split( "/" );
  return parts[ parts.length - 1 ];
};

export const extractCarIdFromUrl = ( url ) => {
  const parts = url.split( "/" );
  return parts[ parts.length - 2 ];
};


export const buildImageUrl = ( carId, fileId ) => {
  return `${ SUPABASE_URL }/storage/v1/object/public/images/users/${ carId }/${ fileId }`;
};

export const processFileSelection = async ( e ) => {
  const files = e.target.files;
  const newImages = {};

  for ( let file of files ) {
    const previewUrl = URL.createObjectURL( file );
    newImages[ previewUrl ] = file;
  }

  return newImages;
};


export const uploadNewImages = async ( images, carId ) => {
  const uploadedUrls = [];

  for ( const previewUrl in images ) {
    const file = images[ previewUrl ];

    // Skip if it's already a Supabase URL (from edit mode)
    if ( typeof file === "string" ) {
      uploadedUrls.push( file );
      continue;
    }

    try {
      const fileId = uid();
      const extension = file.type.replace( "image/", "" ).toLowerCase();
      const fileName = `${ fileId }.${ extension }`;

      // Upload to Supabase
      await uploadFile( carId, fileName, file );

      // Build and store the public URL
      const url = buildImageUrl( carId, fileName );
      uploadedUrls.push( url );
    } catch ( error ) {
      console.error( `Failed to upload image:`, error );
      throw new Error( `Failed to upload image: ${ error.message }` );
    }
  }

  return uploadedUrls;
};


export const deleteImages = async ( imagesToDelete ) => {
  for ( const imageUrl of imagesToDelete ) {
    try {
      const carId = extractCarIdFromUrl( imageUrl );
      const fileId = extractFileIdFromUrl( imageUrl );
      const path = `users/${ carId }/${ fileId }`;

      await deleteFile( path );
    } catch ( error ) {
      console.error( `Failed to delete image:`, error );
      throw new Error( `Failed to delete image: ${ error.message }` );
    }
  }
};


export const getDeletedImages = ( originalImages, currentImagesObject ) => {
  const currentUrls = Object.values( currentImagesObject ).filter(
    ( value ) => typeof value === "string"
  );

  return originalImages.filter( ( url ) => !currentUrls.includes( url ) );
};


export const syncImagesWithSupabase = async (
  imagesData,
  carId,
  originalImages = [],
  mode = "new"
) => {
  let finalImages = [];

  if ( mode === "delete" ) {
    // Delete all images
    await deleteImages( originalImages );
    return [];
  }

  if ( mode === "edit" ) {
    // Find deleted images and remove them from Supabase
    const deletedImages = getDeletedImages( originalImages, imagesData );
    if ( deletedImages.length > 0 ) {
      await deleteImages( deletedImages );
    }

    // Upload new images only
    const newImages = {};
    for ( const key in imagesData ) {
      if ( typeof imagesData[ key ] !== "string" ) {
        newImages[ key ] = imagesData[ key ];
      } else {
        finalImages.push( key ); // Keep existing URLs
      }
    }

    if ( Object.keys( newImages ).length > 0 ) {
      const uploadedUrls = await uploadNewImages( newImages, carId );
      finalImages = [ ...finalImages, ...uploadedUrls ];
    }
  } else {
    // mode === 'new'
    finalImages = await uploadNewImages( imagesData, carId );
  }

  return finalImages;
};

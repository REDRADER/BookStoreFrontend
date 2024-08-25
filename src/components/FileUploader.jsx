// ImageUpload.js
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const FileUploader = ({ onChange, value }) => {
    
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage(file);
    onChange(file);
  };
  useEffect(() => { 
    setSelectedImage(value);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div {...getRootProps()} className={` flex justify-center items-center w-full h-[350px] border-2 duration-200 p-2 rounded-md  ${isDragActive ? 'border-solid' : 'border-dashed '}`}>
      <div className="w-full h-full flex justify-center items-center">
       {!selectedImage &&<div className="">
       <p>{isDragActive ? 'Drop the image here' : 'Drag or Drop Image here'}</p>
        <span>.jpg, .jpeg, .png, .gif, .svg</span>
       </div> 
        }
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className='w-full object-contain' />}
      </div>
      <input {...getInputProps()} />
    </div>
  );
};

export default FileUploader;

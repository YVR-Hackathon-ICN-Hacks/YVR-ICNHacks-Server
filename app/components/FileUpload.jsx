'use client'

import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import csvToJson from '../../lib/utils/csvToJson';

const fileTypes = ["csv"]

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    Array.from(file)
    .filter((file) => file.type === "text/csv")
    .forEach( async (file) => {

      const text = await file.text();
      
      csvToJson(text, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data[-1]);
          //TODO filter Function YS's algorithm will be implemented here



        }
      });      
    });
  };
  

  return (
    <div>
      <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />

    </div>
  );
};
export default FileUpload;
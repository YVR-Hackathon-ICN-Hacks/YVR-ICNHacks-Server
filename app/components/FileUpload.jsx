'use client'

import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import csvToJson from '../../lib/utils/csvToJson';
import calculateHourlyAverages from '@/lib/utils/filterData';

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
          console.log(data);
          //TODO YS's algorithm will be implemented here
          console.log(calculateHourlyAverages(data))


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
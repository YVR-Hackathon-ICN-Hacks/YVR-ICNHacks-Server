'use client'

import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import csvToJson from '../../lib/utils/csvToJson';
import calculateHourlyAverages from '@/lib/utils/filterData';

const fileTypes = ["csv"]

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [extractedZoneCode, setExtractedZoneCode] = useState(null);
  const [isCodeRecognized, setIsCodeRecognized] = useState(true);

  const handleChange = (file) => {
    Array.from(file)
    .filter((file) => file.type === "text/csv")
    .forEach(async (file) => {

      const text = await file.text();
      
      csvToJson(text, async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(data);
          //Zone Code List : Additional list of zone codes will be added manually
          // console.log(calculateHourlyAverages(data))

          const dataToStore = calculateHourlyAverages(data)
          setDataToUpload(dataToStore);

          // console.log(dataToStore)

          // try {
          //   const response = await fetch('api/data', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(dataToStore),
          //   });
          //   if (!response.ok) {
          //     throw new Error('Network response was not ok');
          //   }
          //   const responseData = await response.json();
          //   // console.log(responseData);
          // } catch (error) {
          //   console.error('Error while posting data:', error);
          // }

          //Extracting Zone Code from the data
          const zoneCodeList = [
            "ITB_VAV_A42_W3327_02", 
            "ITB_VAV_A43_W3325_01_01", 
            "ITBFC3037_1", 
            "ITB_VAV_A43_W3325_01_01", 
            "ITB_VAV_A42_W3325_02", 
            "ITB_VAV_A42_W3327_01", 
            "ITB_VAV_A42_W3338_01"
          ];

          // 구역 코드 추출
          const columns = Object.keys(data[0]);
          const matchingZoneCode = zoneCodeList.find(zoneCode => 
            columns.some(column => column.includes(zoneCode))
          );

          setExtractedZoneCode(matchingZoneCode);
          setIsCodeRecognized(!!matchingZoneCode);
        }
      });
    });
  };

  const handleUpload = async () => {
    if (!dataToUpload) {
      console.error('No data to upload');
      return;
    }

    try {
      const response = await fetch('api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpload),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  return (
    <div>
      <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      <button onClick={handleUpload} style={{ marginTop: '20px' }}>Upload</button>
      <div>
        {extractedZoneCode && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Extracted Zone Code:</h3>
            <p style={{ margin: '0' }}>{extractedZoneCode}</p>
          </div>
        )}
        {!isCodeRecognized && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <p style={{ margin: '0', color: 'red' }}>Unrecognized area code</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileUpload;

'use client'

import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import csvToJson from '../../lib/utils/csvToJson';
import calculateHourlyAverages from '@/lib/utils/filterData';
import extractUniqueDates from '../../lib/utils/extractUniqueDates';
import checkForDuplicates from '../../lib/utils/checkForDuplicateAreaAndDate';

const fileTypes = ["csv"]
const endpoint = "https://yvr-icn-hacks-server.vercel.app";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [areaCodeFromDB, setAreaCodeFromDB] = useState(null);  
  const [isAreaCodeAndDateduplicated, setIsAreaCodeAndDateduplicated] = useState(false);
  const [newAreaCodeAndDate, setNewAreaCodeAndDate] = useState(null);

  useEffect(() => {
    getAreaCodeInDB();
  },[]);


  const getAreaCodeInDB = async () => {
    try {
      const response = await fetch(`${endpoint}/api/areaCode`, {
        method: 'GET',        
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();      
      setAreaCodeFromDB(responseData);      
    } catch (error) {
      console.error('Error while getting area code:', error);
    }
  }

  const handleChange = (file) => {
    Array.from(file)
    .filter((file) => file.type === "text/csv")
    .forEach(async (file) => {

      const text = await file.text();
      
      csvToJson(text, async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          //Zone Code List : Additional list of zone codes will be added manually
          const dataToStore = calculateHourlyAverages(data)          
          setDataToUpload(dataToStore);          

          // Extracting Area Code from the data
          const getAreaCode = Object.values(data[0]);          
          const areaCode = getAreaCode[0];
          
          // Extracting Unique Date from the data
          const datesOfData = extractUniqueDates(dataToStore);          

          // Check if the data is duplicate
          const isDuplicate = checkForDuplicates(areaCode, datesOfData, areaCodeFromDB);
                  
          //Check if the area code is in the current area codes        
          if (isDuplicate) {
            console.log("Yes this data is in the db")
            setIsAreaCodeAndDateduplicated(true);
          } else {
            console.log("No this data is not in the db")
            setIsAreaCodeAndDateduplicated(false);         
            setNewAreaCodeAndDate({
              areaCode: areaCode,
              dates: datesOfData,
            });   
          }          
        }
      });
    });
  };

  const handleUpload = async () => {
    if (!dataToUpload) {
      console.error('No data to upload');
      return;
    }

    if(isAreaCodeAndDateduplicated){
      console.error("Area Code and Date is duplicated");
      return;
    }

    // send data to the server
    try {
      const response = await fetch(`${endpoint}/api/data`, {
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

    // send area code and date to the server
    try {
      const response = await fetch(`${endpoint}/api/areaCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAreaCodeAndDate),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error while posting areaCode:', error);
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
        {/* {extractedZoneCode && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Extracted Zone Code:</h3>
            <p style={{ margin: '0' }}>{extractedZoneCode}</p>
          </div>
        )}
        {!isCodeRecognized && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <p style={{ margin: '0', color: 'red' }}>Unrecognized area code</p>
          </div>
        )} */}
        <span>Current Area Code & Time</span>
        <div>
          {areaCodeFromDB && areaCodeFromDB.areaCodes.map((areaCode) => (                       
            <div key={areaCode.id}>
              <span>{areaCode.areaCode}</span>
              {
                areaCode.dates?.map((date) => (                                    
                  <div key={date}>
                    <span>{date}</span>
                  </div>
                ))  
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FileUpload;

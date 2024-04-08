import Papa from 'papaparse';

const csvToJson = (file, callback) => {
  Papa.parse(file, {
    complete: (result) => {
      callback(null, result.data);
    },
    header: true,
    error: (error) => {
      callback(error, null);
    }
  });
};

export default csvToJson;
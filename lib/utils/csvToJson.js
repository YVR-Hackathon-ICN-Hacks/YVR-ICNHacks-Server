import Papa from 'papaparse';

const csvToJson = (file, callback) => {
  Papa.parse(file, {
    complete: (result) => {
      const fieldNameMapping = {
        'RT_AV_TL': 'temperature',
        'FLW_AV_TL': 'air_flow',
        'CO2_TL': 'co2'
      };

      const order = ['area_id', 'Timestamp', 'temperature', 'air_flow', 'co2']

      const renameFields = (item) => {
        let newItem = {};

        let areaId = null;

        Object.keys(item).forEach((key) => {

          const regex = /(.+?)(?:_CO2_TL|_RT_AV_TL|_FLW_AV_TL)/;
          const match = key.match(regex);
          if(match) {
            areaId = match[1];
          }
        
          const newKey = Object.keys(fieldNameMapping).find(k => key.endsWith(k)) ? fieldNameMapping[Object.keys(fieldNameMapping).find(k => key.endsWith(k))] : key;
          newItem[newKey] = item[key];
        });

        if (areaId) {
          newItem['area_id'] = areaId;
        }

        return newItem;
      };

      const renamedJsonData = result.data.map(renameFields);

      renamedJsonData.pop()

      const reorderFields = (data, order) => {
        return data.map(item => {
          let orderedItem = {};
          order.forEach(key => {
            if(item[key] !== undefined) {
              orderedItem[key] = item[key];
            }
          });
          return orderedItem;
        });
      };

      const orderedJsonData = reorderFields(renamedJsonData, order);

      callback(null, orderedJsonData);
    },
    header: true,
    error: (error) => {
      callback(error, null);
    }
  });
};

export default csvToJson;

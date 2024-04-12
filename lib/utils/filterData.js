function calculateHourlyAverages(dynamicData) {
  const hourlyData = {};

  dynamicData.forEach(item => {
    const hour = item.Timestamp.substring(0, 13);
    if (!hourlyData[hour]) {
      hourlyData[hour] = [];
    }
    hourlyData[hour].push(item);
  });

  const averagedData = Object.keys(hourlyData).map(hour => {
    const items = hourlyData[hour];
    const averages = items.reduce((acc, curr) => {
      Object.keys(curr).forEach(key => {
        if (key !== 'Timestamp' && key !== 'area_id') {
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] += parseFloat(curr[key]);
        }
      });
      return acc;
    }, {});

    const areaId = items[0].area_id;

    Object.keys(averages).forEach(key => {
      averages[key] /= items.length;
    });

    const id = `${areaId}_${hour}`.replace(/\s+/g, '_')

    const datetime = new Date(`${hour.replace(' ', 'T')}:00:00Z`);
    // datetime.setHours(datetime.getHours() - 17);

    return {
      id: id,
      area_id: areaId,
      timestamp: datetime,
      ...averages
    };
  });

  return averagedData;
}

export default calculateHourlyAverages;
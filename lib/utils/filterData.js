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
        if (key !== 'Timestamp') {
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] += curr[key];
        }
      });
      return acc;
    }, {});

    Object.keys(averages).forEach(key => {
      averages[key] /= items.length;
    });

    return {
      Timestamp: `${hour}:00:00`,
      ...averages
    };
  });

  return averagedData;
}
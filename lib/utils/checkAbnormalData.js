const calculateAverage = (values) => values.reduce((acc, value) => acc + value, 0) / values.length;

const calculateStandardDeviation = (values, average) => {
  const squareDiffs = values.map(value => (value - average) ** 2);
  const averageSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(averageSquareDiff);
};

export const getMeanAndSD = async (data) => {
  try {
    const temperatures = data.map(item => item.temperature);
    const airFlows = data.map(item => item.air_flow);
    const co2Levels = data.map(item => item.co2);

    const averageTemperature = calculateAverage(temperatures);
    const averageAirFlow = calculateAverage(airFlows);
    const averageCo2Level = calculateAverage(co2Levels);

    const stdDevTemperature = calculateStandardDeviation(temperatures, averageTemperature);
    const stdDevAirFlow = calculateStandardDeviation(airFlows, averageAirFlow);
    const stdDevCo2Level = calculateStandardDeviation(co2Levels, averageCo2Level);

    return [
      averageTemperature,
      stdDevTemperature,
      averageAirFlow,
      stdDevAirFlow,
      averageCo2Level,
      stdDevCo2Level
    ];
  } catch (error) {
    console.error('error:', error);
  }
};

export const checkAbnormalData = async (data, avgT, sdT, avgAF, sdAF, avgCO2, sdCO2) => {
  let is_abnormal = false;
  let abnormal_temperature = "avg";
  let abnormal_air_flow = "avg";
  let abnormal_co2 = "avg";
  let checkPriority = 0;

  if (data.temperature > avgT + (3 * sdT)) {
    abnormal_temperature = "too_high";
    checkPriority += 2;
    is_abnormal = true;
  } else if (data.temperature < avgT - (3 * sdT)) {
    abnormal_temperature = "too_low";
    checkPriority += 2;
    is_abnormal = true;
  } else if (data.temperature > avgT + (2 * sdT)) {
    abnormal_temperature = "high";
    checkPriority += 1;
    is_abnormal = true;
  } else if (data.temperature < avgT - (2 * sdT)) {
    abnormal_temperature = "low";
    checkPriority += 1;
    is_abnormal = true;
  }

  if (data.air_flow > avgAF + (3 * sdAF)) {
    abnormal_air_flow = "too_high";
    checkPriority += 2;
    is_abnormal = true;
  } else if (data.air_flow < avgAF - (3 * sdAF)) {
    abnormal_air_flow = "too_low";
    checkPriority += 2;
    is_abnormal = true;
  } else if (data.air_flow > avgAF + (2 * sdAF)) {
    abnormal_air_flow = "high";
    checkPriority += 1;
    is_abnormal = true;
  } else if (data.air_flow < avgAF - (2 * sdAF)) {
    abnormal_air_flow = "low";
    checkPriority += 1;
    is_abnormal = true;
  }

  if (data.co2 > avgCO2 + (3 * sdCO2)) {
    abnormal_co2 = "too_high";
    checkPriority += 2;
    is_abnormal = true;
  } else if (data.co2 < avgCO2 - (3 * sdCO2)) {
    abnormal_co2 = "too_low";
    checkPriority += 2;
    is_abnormal = true;
  } else if (data.co2 > avgCO2 + (2 * sdCO2)) {
    abnormal_co2 = "high";
    checkPriority += 1;
    is_abnormal = true;
  } else if (data.co2 < avgCO2 - (2 * sdCO2)) {
    abnormal_co2 = "low";
    checkPriority += 1;
    is_abnormal = true;
  }

  let priority

  if (checkPriority <= 1) {
    priority = 0;
  } else if (checkPriority <= 2) {
    priority = 1;
  } else {
    priority = 2;
  }

  return [ is_abnormal, priority, abnormal_temperature, abnormal_air_flow, abnormal_co2 ];
};
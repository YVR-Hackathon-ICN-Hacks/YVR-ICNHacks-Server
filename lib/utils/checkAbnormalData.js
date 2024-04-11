//Calculate each quartiles
const calculateQuartiles = (data) => {
  const sortedData = data.slice().sort((a, b) => a - b);
  const q1 = sortedData[Math.floor(sortedData.length / 4)];
  const q3 = sortedData[Math.ceil((sortedData.length * 3) / 4)];
  return { q1, q3 };
};

//Analyze temperature data and check if it exceeds normal range
const detectTemperatureAnomalies = (temperatureData, normalRange) => {
  return temperatureData.map(data => ({
    ...data,
    isAbnormal: data.temperature < normalRange.min || data.temperature > normalRange.max
  }));
};

// Analyze airflow data and return air ciruclate system recommendation
const analyzeAirflow = (airflowData, quartiles) => {
  return airflowData.map(data => ({
    ...data,
    airflowRecommendation: data.airflow < quartiles.q1 ? 'Increase' : (data.airflow > quartiles.q3 ? 'Decrease' : 'Normal')
  }));
};

//If airflow is greater than Q3, ask how many people are detected
const detectPeopleBasedOnAirflow = (airflowData, quartiles) => {
  return airflowData.map(data => ({
    ...data,
    peopleDetected: data.airflow > quartiles.q3
  }));
};

// Analyze airport data
export const analyzeAirportData = (data) => {
  const temperatureData = data.map(item => item.temperature);
  const airflowData = data.map(item => item.air_flow);

  const normalTemperatureRange = { min: 20, max: 24 };
  const temperatureAnalysis = detectTemperatureAnomalies(temperatureData, normalTemperatureRange);

  const airflowQuartiles = calculateQuartiles(airflowData);
  const airflowAnalysis = analyzeAirflow(airflowData, airflowQuartiles);
  const peopleDetection = detectPeopleBasedOnAirflow(airflowData, airflowQuartiles);

  return {
    temperatureAnalysis,
    airflowAnalysis,
    peopleDetection
  };
};

const testData = [
  { temperature: 19, air_flow: 90 },   // 이상 온도 (낮음)
  { temperature: 25.5, air_flow: 93 }, // 이상 온도 (높음)
  { temperature: 22.5, air_flow: 800 }, // Q3 초과 공기 흐름
  { temperature: 23, air_flow: 150 }   // 정상 데이터
];


// 함수 실행
const analysisResult = analyzeAirportData(testData);

// 결과 출력
console.log(analysisResult);

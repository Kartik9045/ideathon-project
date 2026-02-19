export interface LocationData {
  id: string;
  name: string;
  aqi: number;
  temperature: number;
  humidity: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  status: 'Good' | 'Satisfactory' | 'Moderately Polluted' | 'Poor' | 'Very Poor' | 'Severe';
}

export interface TimeSeriesData {
  time: string;
  aqi: number;
  temperature: number;
  humidity: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
}

export interface AnalyticsData {
  locations: LocationData[];
  aqiTrend: TimeSeriesData[];
  pollutantData: {
    name: string;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
  }[];
}

function getAQIStatus(aqi: number): LocationData['status'] {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderately Polluted';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

function getRandomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Make small incremental changes to a value instead of random jumps
function getIncrementalChange(currentValue: number, min: number, max: number, changePercent: number = 0.1): number {
  const maxChange = Math.max(5, currentValue * changePercent);
  const change = (Math.random() - 0.5) * 2 * maxChange; // Random change between -maxChange and +maxChange
  let newValue = currentValue + change;
  return Math.max(min, Math.min(max, newValue));
}

function generateLocationData(name: string, id: string, aqiVariation: number = 0): LocationData {
  const baseAQI = getRandomInRange(20, 400);
  const aqi = Math.max(0, Math.min(500, baseAQI + aqiVariation));
  
  return {
    id,
    name,
    aqi,
    temperature: getRandomInRange(15, 45),
    humidity: getRandomInRange(20, 80),
    pm25: getRandomInRange(5, 300),
    pm10: getRandomInRange(10, 500),
    o3: getRandomInRange(10, 300),
    no2: getRandomInRange(20, 200),
    status: getAQIStatus(aqi),
  };
}

function generateTimeSeries(): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    const baseAQI = getRandomInRange(30, 350);
    
    data.push({
      time: time.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      aqi: baseAQI,
      temperature: getRandomInRange(15, 45),
      humidity: getRandomInRange(20, 80),
      pm25: getRandomInRange(5, 250),
      pm10: getRandomInRange(15, 450),
      o3: getRandomInRange(10, 250),
      no2: getRandomInRange(20, 180),
    });
  }
  
  return data;
}

export function generateAllData(): AnalyticsData {
  const locations = [
    generateLocationData('Connaught Place', 'cp', 0),
    generateLocationData('India Gate', 'ig', -30),
    generateLocationData('Dwarka', 'dwarka', 50),
  ];

  const aqiTrend = generateTimeSeries();

  const pollutantData = locations.map((loc) => ({
    name: loc.name,
    pm25: loc.pm25,
    pm10: loc.pm10,
    o3: loc.o3,
    no2: loc.no2,
  }));

  return {
    locations,
    aqiTrend,
    pollutantData,
  };
}

// Update existing data with realistic incremental changes
export function updateDataIncrementally(previousData: AnalyticsData): AnalyticsData {
  const updatedLocations = previousData.locations.map((location) => ({
    ...location,
    aqi: Math.round(getIncrementalChange(location.aqi, 0, 500, 0.08)),
    temperature: Math.round(getIncrementalChange(location.temperature, 15, 45, 0.05) * 10) / 10,
    humidity: Math.round(getIncrementalChange(location.humidity, 20, 80, 0.05)),
    pm25: Math.round(getIncrementalChange(location.pm25, 5, 300, 0.08)),
    pm10: Math.round(getIncrementalChange(location.pm10, 10, 500, 0.08)),
    o3: Math.round(getIncrementalChange(location.o3, 10, 300, 0.08)),
    no2: Math.round(getIncrementalChange(location.no2, 20, 200, 0.08)),
    status: getAQIStatus(Math.round(getIncrementalChange(location.aqi, 0, 500, 0.08))),
  }));

  // Update time series - shift old data and add new data point
  const updatedTrend = [
    ...previousData.aqiTrend.slice(1),
    {
      time: new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      aqi: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].aqi, 30, 350, 0.1)),
      temperature: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].temperature, 15, 45, 0.05) * 10) / 10,
      humidity: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].humidity, 20, 80, 0.05)),
      pm25: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].pm25, 5, 250, 0.08)),
      pm10: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].pm10, 15, 450, 0.08)),
      o3: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].o3, 10, 250, 0.08)),
      no2: Math.round(getIncrementalChange(previousData.aqiTrend[previousData.aqiTrend.length - 1].no2, 20, 180, 0.08)),
    },
  ];

  const pollutantData = updatedLocations.map((loc) => ({
    name: loc.name,
    pm25: loc.pm25,
    pm10: loc.pm10,
    o3: loc.o3,
    no2: loc.no2,
  }));

  return {
    locations: updatedLocations,
    aqiTrend: updatedTrend,
    pollutantData,
  };
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#00E400'; // Good - Green
  if (aqi <= 100) return '#FFFF00'; // Satisfactory - Yellow
  if (aqi <= 200) return '#FF7E00'; // Moderately Polluted - Orange
  if (aqi <= 300) return '#FF0000'; // Poor - Red
  if (aqi <= 400) return '#99004C'; // Very Poor - Purple
  return '#7E0023'; // Severe - Maroon
}

export function getAQIColorClassName(aqi: number): string {
  if (aqi <= 50) return 'aqi-good';
  if (aqi <= 100) return 'aqi-satisfactory';
  if (aqi <= 200) return 'aqi-moderate';
  if (aqi <= 300) return 'aqi-poor';
  if (aqi <= 400) return 'aqi-very-poor';
  return 'aqi-severe';
}

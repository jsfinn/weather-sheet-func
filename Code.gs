const VISUALCROSSING_API_KEY = '<API_KEY>';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

/**
 * Gets average temperature between two dates for a ZIP code.
 *
 * @param {string} zipCode The ZIP code to get temperature data for
 * @param {Date} startDate The start date
 * @param {Date} endDate The end date
 * @return {number} The average temperature in Fahrenheit
 * @customfunction
 */
function GETAVGTEMP(zipCode, startDate, endDate) {
  if (!zipCode || !startDate || !endDate) {
    throw new Error('Missing required parameters');
  }

  try {
    // Format dates as YYYY-MM-DD
    const start = Utilities.formatDate(new Date(startDate), 'UTC', 'yyyy-MM-dd');
    const end = Utilities.formatDate(new Date(endDate), 'UTC', 'yyyy-MM-dd');
    
    // Create cache key
    const cacheKey = `${zipCode}_${start}_${end}`;
    Logger.log(`🔍 Checking Script Properties for key: ${cacheKey}`);
    
    // Check Script Properties
    const props = PropertiesService.getScriptProperties();
    const cachedValue = props.getProperty(cacheKey);
    
    if (cachedValue !== null) {
      Logger.log(`✅ Found in Script Properties: ${cachedValue} for ${cacheKey}`);
      return parseFloat(cachedValue);
    }
    
    // If not found, call API
    Logger.log(`❌ Not found in Script Properties - calling API for ${cacheKey}`);
    const url = `${BASE_URL}/${zipCode}/${start}/${end}?unitGroup=us&include=days&key=${VISUALCROSSING_API_KEY}&contentType=json`;
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    
    // Calculate average temperature
    const temps = data.days.map(day => day.temp);
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    const roundedTemp = Math.round(avgTemp * 100) / 100;
    
    // Store in Script Properties
    props.setProperty(cacheKey, roundedTemp.toString());
    Logger.log(`💾 Stored in Script Properties: ${cacheKey} = ${roundedTemp}`);
    
    return roundedTemp;
    
  } catch (error) {
    throw new Error(`Failed to get temperature data: ${error.message}`);
  }
}

/**
 * View all cached weather data in Script Properties
 */
function viewWeatherCache() {
  const props = PropertiesService.getScriptProperties();
  const data = props.getProperties();
  Logger.log('📊 Current Weather Cache Contents:');
  for (const key in data) {
    Logger.log(`   ${key}: ${data[key]}°F`);
  }
}

/**
 * Clear all cached weather data from Script Properties
 */
function clearWeatherCache() {
  PropertiesService.getScriptProperties().deleteAllProperties();
  Logger.log('🗑️ Weather cache cleared from Script Properties');
}

/**
 * Test function to verify API connection and Script Properties caching
 */
function testWeatherAPI() {
  const zipCode = '10001';
  const start = new Date('2024-03-01');
  const end = new Date('2024-03-03'); // 3 days of data
  
  Logger.log('First call (should call API):');
  Logger.log(GETAVGTEMP(zipCode, start, end));
  
  Logger.log('Second call (should use Script Properties):');
  Logger.log(GETAVGTEMP(zipCode, start, end));
  
  // Show what's in the cache
  viewWeatherCache();
} 

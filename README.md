# Google Sheets Weather Function

A custom Google Sheets function that retrieves average temperatures between two dates for a given ZIP code using the Visual Crossing Weather API.

## Features

- Custom function `GETAVGTEMP()` that returns the average temperature for a ZIP code between two dates
- Uses Visual Crossing Weather API for reliable historical weather data
- Returns temperatures in Fahrenheit
- Handles error cases gracefully

## Prerequisites

1. [Node.js](https://nodejs.org/) installed
2. [Google Clasp](https://github.com/google/clasp) installed and configured
   ```bash
   npm install -g @google/clasp
   clasp login
   ```
3. [Visual Crossing API key](https://www.visualcrossing.com/weather-api)

## Setup

1. Clone this repository
2. Open `Code.gs` and add your Visual Crossing API key:
   ```javascript
   const VISUALCROSSING_API_KEY = 'your-api-key-here';
   ```
3. Push the code to Google Apps Script:
   ```bash
   clasp push
   ```
4. Deploy the project:
   ```bash
   clasp deploy
   ```

## Usage in Google Sheets

1. In your Google Sheet, use the function like this:
   ```
   =GETAVGTEMP("10001", DATE(2024,3,1), DATE(2024,3,7))
   ```
   or
   ```
   =GETAVGTEMP("10001", TODAY()-7, TODAY())
   ```

2. First-time Authorization:
   - Click "Allow access" when prompted
   - Choose your Google account
   - If you see a warning that the app isn't verified:
     1. Click "Advanced"
     2. Click "Go to [Your Project Name] (unsafe)"
     3. Click "Allow"

## Testing

1. Open the Script Editor in Google Sheets (Extensions > Apps Script)
2. Select the `testWeatherAPI()` function from the dropdown
3. Click the "Run" button
4. Check the execution log for results

## Troubleshooting

If you encounter errors:
- Verify your Visual Crossing API key is correctly set
- Check your API usage limits at https://www.visualcrossing.com/account/usage
- Ensure the ZIP code exists
- Check that your date range is valid
- Make sure you have authorized the script to run

## API Documentation

- [Visual Crossing Weather API Documentation](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Check Visual Crossing API Usage](https://www.visualcrossing.com/account/usage)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
Following "The Complete Node.js Developer Course (3rd Edition)" by Andrew Mead

02-weather-app requires valid weather and geocoding API keys to work.
These can be generated at https://www.weatherapi.com and https://www.mapbox.com

I recommend putting the key in a .env file like below:
WEATHER_API_KEY=your_api_key_here
GEOCODING_API_KEY=your_api_key_here

You can then use the dotenv package to load and access the key.

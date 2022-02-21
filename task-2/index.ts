import Provider from './provider';

const main = async () => {
  // Find and print in console the city located at latitude/longitude 51.5074 and 0.1278 accordingly
  const city = await Provider.findCity(51.5074, 0.1278);
  console.log(city);

  // Print in console the weather for the city located at lat/long = 51.5074 and 0.1278
  console.log(await Provider.getWeather(city));

  // Print in console in one line the weather and currency for a given city (London)
  console.log(`${await Provider.getWeather(city)}. ${await Provider.getLocalCurrency(city)}.`);
};

main();


const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
                .options({
                  a: {
                    demand: true,
                    alias: 'address',
                    describe: 'Address to fetch wather for',
                    string: true
                  }
                })
                .help()
                .alias('help','h')
                .argv;
                
var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=FI0TVnbWHxncxMfrMbmpA2hGnByhdTLf&location=${encodedAddress}`;

axios.get(geocodeUrl) //parse JSON data,return promise
.then( (response) => {

    const KEY = '27daed0d0eb1eb18801e8a5c67fa7676';
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    //console.log('lat lng',lat,lng);

    const weatherUrl = `https://api.darksky.net/forecast/${KEY}/${lat},${lng}`;

    return axios.get(weatherUrl).then( (response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`temperature : ${temperature} but it feels like ${apparentTemperature}`);
    });

    //console.log(response.data);
}).catch( (e) => {
    if (e.code === 'ENOTFOUND')
    {
        console.log('unable to connect to API server');    
    }
    //console.log(e.code);
});


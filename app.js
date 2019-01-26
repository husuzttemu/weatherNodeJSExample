
const fs = require('fs');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weatherresult = require('./weatherresult/weatherresult');



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


/*
request
  .get('http://mysite.com/doodle.png')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('doodle.png'));
  */

  //var googlepage = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAeA25o29blX5ML60SW-JQ2lYheg2mAHDw";

  //const googlepage = "http://www.mapquestapi.com/geocoding/v1/address?key=FI0TVnbWHxncxMfrMbmpA2hGnByhdTLf&location=1301%20lombard%20street%20philadelphia";



 geocode.geocodeAddress(argv.a,  (errorMessage,results) => {

  if (errorMessage) {
    console.log(errorMessage);
  }
  else{
    var result = JSON.stringify(results,undefined,2);
    console.log(result);

    weatherresult.weather(results.latitude,results.longitute,  (errorMessage,results) => {

      if (errorMessage) {
        console.log(errorMessage);
      }
      else{
        console.log('temperature : ' + JSON.stringify(results,undefined,2));
      }
    
     });
    

  }

 });

 
  

  //console.log(JSON.stringify(result));

  
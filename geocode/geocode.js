const request = require('request');


var geocodeAddress = (address,callback) =>
{

  var encodedAddress = encodeURIComponent(address);
  
  var googlepage = `http://www.mapquestapi.com/geocoding/v1/address?key=FI0TVnbWHxncxMfrMbmpA2hGnByhdTLf&location=${encodedAddress}`;

  
  //1301%20lombard%20street%20philadelphia";

 request(
      {
      url : googlepage,
      json : true }
      ,
      (error, response, body) => {
          //console.log(JSON.stringify(body,undefined,2));
          if (error){
            callback('Unable to connect to server');
          }
          else{
            callback(undefined,{
               location : body.results[0].providedLocation.location,
             latitude : body.results[0].locations[0].latLng.lat,
             longitute : body.results[0].locations[0].latLng.lng
            });
           
          }
         


  });

} ;

module.exports.geocodeAddress = geocodeAddress;


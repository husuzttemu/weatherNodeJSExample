var request = require('request');

var weather = (lat,long,callback) => {

// key    : 27daed0d0eb1eb18801e8a5c67fa7676
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]

    const KEY = '27daed0d0eb1eb18801e8a5c67fa7676';

    const weatherPage = `https://api.darksky.net/forecast/${KEY}/${lat},${long}`;

    //console.log(weatherPage);

    request(
        {
        url : weatherPage,
        json : true }
        ,
        (error, response, body) => {
            //console.log(JSON.stringify(body,undefined,2));
           console.log(response.statusCode);
            if (error){
              callback('Unable to connect to server');
            }
            else if(!error && response.statusCode === 200)
            {
              callback(undefined,{
                  temperature : body.currently.temperature
              });
            }
            else //(response.statusCode === 403)
            {
                callback('Unable to fetch weather.')
            }
           
  
    });

};

module.exports.weather = weather;

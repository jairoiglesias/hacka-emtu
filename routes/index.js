
module.exports = function(app){

  var buscaStop = function(lat, lng){

    return new Promise(function(resolve, reject){

      var conn = require('./../libs/connectdb.js')()

      var sql = "SELECT * FROM stops"

      conn.query(sql, function(err, rows, fields){
        
        var tam = rows.length
        var locations = []

        rows.forEach(function(value, index) {

          var lat2 = value.stop_lat
          var lng2 = value.stop_lon

          // Calcula a distancia do endereço do usuario com o Stop atual
          var distance = getDistanceV2(lat1, lng1, lat2, lng2, 'K')
          // console.log('distance: ' + distance)

          if(distance <= 0.5){
            
            console.log(lat1, lng1)
            console.log(lat2, lng2)
            console.log('distance: ' + distance)
            console.log(value)

            locations.push(value)

          }

          if(index == (tam - 1)){
            resolve(locations)
          }

        })


      })

    })

  }


  // TESTE 01

  var haversine = function(lat1, lon1, lat2, lon2) {
    var deg2rad = 0.017453292519943295; // === Math.PI / 180
    var cos = Math.cos;
    lat1 *= deg2rad;
    lon1 *= deg2rad;
    lat2 *= deg2rad;
    lon2 *= deg2rad;
    var diam = 12742; // Diameter of the earth in km (2 * 6371)
    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;
    var a = ( (1 - cos(dLat)) + (1 - cos(dLon)) * cos(lat1) * cos(lat2)) / 2;

    return diam * Math.asin(Math.sqrt(a)) * 1000;
  }

  // TESTE 02

  var getDistance = function(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  // TESTE 03

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::                                                                         :::
  //:::  This routine calculates the distance between two points (given the     :::
  //:::  latitude/longitude of those points). It is being used to calculate     :::
  //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
  //:::                                                                         :::
  //:::  Definitions:                                                           :::
  //:::    South latitudes are negative, east longitudes are positive           :::
  //:::                                                                         :::
  //:::  Passed to function:                                                    :::
  //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  //:::    unit = the unit you desire for results                               :::
  //:::           where: 'M' is statute miles (default)                         :::
  //:::                  'K' is kilometers                                      :::
  //:::                  'N' is nautical miles                                  :::
  //:::                                                                         :::
  //:::  Worldwide cities and other features databases with latitude longitude  :::
  //:::  are available at https://www.geodatasource.com                          :::
  //:::                                                                         :::
  //:::  For enquiries, please contact sales@geodatasource.com                  :::
  //:::                                                                         :::
  //:::  Official Web site: https://www.geodatasource.com                        :::
  //:::                                                                         :::
  //:::               GeoDataSource.com (C) All Rights Reserved 2017            :::
  //:::                                                                         :::
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var getDistanceV2 = function (lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

  app.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' })

  })

  app.post('/get_keepers', (req, res) => {



  })

  // DUMMY

  app.get('/get_dummy', (req, res) => {

    // var dummy = []

    // dummy.push(
    // {
    //   lat: -22.818411,
    //   lng: -47.093903,
    //   trajetos:[
    //     {tipo: 'onibus', lat1: -22.817907, lng1: -47.094506, lat2: -22.816548, lng2: -47.096714},
    //     {tipo: 'keeper', lat1: -22.815926, lng1: -47.097411, lat2: -22.815899, lng2: -47.095365},
    //   ]
    // })



    var dummy = [{
      "data": {
        "type": "walk",
        "points": [
          {
            "latitude": -22.814465,
            "longitude": -47.05926
          },
          {
            "latitude": -22.8173196,
            "longitude": -47.0668999
          },
          {
            "latitude": -22.8144996,
            "longitude": -47.0590182
          }
        ]
      }
    }]

    res.send(dummy)

  })

  app.post('/get_stops', (req, res) => {

    // Recupera os parametros de lat/lng do usuario
    
    var lat1 = req.body.lat1
    var lng1 = req.body.lng1
    var lat2 = req.body.lat2
    var lng2 = req.body.lng2

    // DEBUG (R. Luís Vicentim Sobrinho, 563 - Barão Geraldo, Campinas - SP, 13084-030)

    /*
      ### Recupera os possiveis STOPS de lat1 lng1
    
    */

    if(lat1 == undefined){
      var lat1 = -22.818411
      var lng1 = -47.093903
    }

    buscaStop(lat1, lng1).then(function(locations){

      res.send(locations)

    })

  })

}
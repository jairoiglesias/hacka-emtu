
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

  app.post('/routes', (req, res) => {

    var routes = {
      "data": [
        {
          "endereco": 'Rua',
          "type": "walk",
          "pois": [{
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }, {
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }],
          "points": [
            {
longitude: -47.0587654,
latitude: -22.8142571,
type: "waypoint",
polyline: "b|fjChdf~GAAA?A?AAA?A?A@A?A?A@A?A?A@A@A@A@A@?@?@A@?@?@A@?@?@?@?@?@?@@??@?@@@?@",
dir: "Head <b>north</b> toward <b>Av. Alan Turing</b>",
dist: {
val: 38,
txt: "38 m",
total: 38
},
timeto: {
val: 20,
txt: "1 min"
}
},
{
longitude: -47.05876,
latitude: -22.81425
},
{
longitude: -47.05876,
latitude: -22.81424
},
{
longitude: -47.05876,
latitude: -22.81423
},
{
longitude: -47.05875,
latitude: -22.81422
},
{
longitude: -47.05875,
latitude: -22.81421
},
{
longitude: -47.05875,
latitude: -22.8142
},
{
longitude: -47.05876,
latitude: -22.81419
},
{
longitude: -47.05876,
latitude: -22.81418
},
{
longitude: -47.05876,
latitude: -22.81417
},
{
longitude: -47.05877,
latitude: -22.81416
},
{
longitude: -47.05877,
latitude: -22.81415
},
{
longitude: -47.05877,
latitude: -22.81414
},
{
longitude: -47.05878,
latitude: -22.81413
},
{
longitude: -47.05879,
latitude: -22.81412
},
{
longitude: -47.0588,
latitude: -22.81411
},
{
longitude: -47.05881,
latitude: -22.8141
},
{
longitude: -47.05882,
latitude: -22.81409
},
{
longitude: -47.05883,
latitude: -22.81409
},
{
longitude: -47.05884,
latitude: -22.81409
},
{
longitude: -47.05885,
latitude: -22.81408
},
{
longitude: -47.05886,
latitude: -22.81408
},
{
longitude: -47.05887,
latitude: -22.81408
},
{
longitude: -47.05888,
latitude: -22.81407
},
{
longitude: -47.05889,
latitude: -22.81407
},
{
longitude: -47.0589,
latitude: -22.81407
},
{
longitude: -47.05891,
latitude: -22.81407
},
{
longitude: -47.05892,
latitude: -22.81407
},
{
longitude: -47.05893,
latitude: -22.81407
},
{
longitude: -47.05894,
latitude: -22.81407
},
{
longitude: -47.05894,
latitude: -22.81408
},
{
longitude: -47.05895,
latitude: -22.81408
},
{
longitude: -47.05896,
latitude: -22.81408
},
{
longitude: -47.05897,
latitude: -22.81409
},
{
longitude: -47.05898,
latitude: -22.81409
},
{
longitude: -47.0589812,
latitude: -22.8140904,
type: "waypoint",
polyline: "`{fjCref~GMXITQb@Od@K\Kp@CRARADKnAEd@]zDk@jFa@fEARAV?HAHAH?Ru@|GCRCTCT?T?XBN?P@H@J",
dir: "Turn <b>right</b> onto <b>Av. Alan Turing</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 809,
txt: "0.8 km",
total: 847
},
timeto: {
val: 137,
txt: "2 mins"
}
},
{
longitude: -47.05911,
latitude: -22.81402
},
{
longitude: -47.05922,
latitude: -22.81397
},
{
longitude: -47.0594,
latitude: -22.81388
},
{
longitude: -47.05959,
latitude: -22.8138
},
{
longitude: -47.05974,
latitude: -22.81374
},
{
longitude: -47.05999,
latitude: -22.81368
},
{
longitude: -47.06009,
latitude: -22.81366
},
{
longitude: -47.06019,
latitude: -22.81365
},
{
longitude: -47.06022,
latitude: -22.81364
},
{
longitude: -47.06062,
latitude: -22.81358
},
{
longitude: -47.06081,
latitude: -22.81355
},
{
longitude: -47.06175,
latitude: -22.8134
},
{
longitude: -47.06293,
latitude: -22.81318
},
{
longitude: -47.06393,
latitude: -22.81301
},
{
longitude: -47.06403,
latitude: -22.813
},
{
longitude: -47.06415,
latitude: -22.81299
},
{
longitude: -47.0642,
latitude: -22.81299
},
{
longitude: -47.06425,
latitude: -22.81298
},
{
longitude: -47.0643,
latitude: -22.81297
},
{
longitude: -47.0644,
latitude: -22.81297
},
{
longitude: -47.06583,
latitude: -22.8127
},
{
longitude: -47.06593,
latitude: -22.81268
},
{
longitude: -47.06604,
latitude: -22.81266
},
{
longitude: -47.06615,
latitude: -22.81264
},
{
longitude: -47.06626,
latitude: -22.81264
},
{
longitude: -47.06639,
latitude: -22.81264
},
{
longitude: -47.06647,
latitude: -22.81266
},
{
longitude: -47.06656,
latitude: -22.81266
},
{
longitude: -47.06661,
latitude: -22.81267
},
{
longitude: -47.06667,
latitude: -22.81268
},
{
longitude: -47.066672,
latitude: -22.8126792,
type: "waypoint",
dist: {
val: 1033,
txt: "1.0 km",
total: 1880
},
timeto: {
val: 156,
txt: "3 mins"
}
},
{
longitude: -47.06685,
latitude: -22.81263
},
{
longitude: -47.06695,
latitude: -22.81261
},
{
longitude: -47.06697,
latitude: -22.81261
},
{
longitude: -47.06709,
latitude: -22.81259
},
{
longitude: -47.06719,
latitude: -22.81257
},
{
longitude: -47.06733,
latitude: -22.81256
},
{
longitude: -47.06743,
latitude: -22.81255
},
{
longitude: -47.06753,
latitude: -22.81255
},
{
longitude: -47.06773,
latitude: -22.81255
},
{
longitude: -47.06784,
latitude: -22.81255
},
{
longitude: -47.06795,
latitude: -22.81256
},
{
longitude: -47.068,
latitude: -22.81256
},
{
longitude: -47.06817,
latitude: -22.81259
},
{
longitude: -47.06835,
latitude: -22.81262
},
{
longitude: -47.06852,
latitude: -22.81266
},
{
longitude: -47.06855,
latitude: -22.81267
},
{
longitude: -47.06884,
latitude: -22.81276
},
{
longitude: -47.0693,
latitude: -22.81294
},
{
longitude: -47.06977,
latitude: -22.81311
},
{
longitude: -47.0698,
latitude: -22.81312
},
{
longitude: -47.07005,
latitude: -22.81321
},
{
longitude: -47.07022,
latitude: -22.81328
},
{
longitude: -47.07039,
latitude: -22.81335
},
{
longitude: -47.07055,
latitude: -22.81344
},
{
longitude: -47.07081,
latitude: -22.81359
},
{
longitude: -47.07089,
latitude: -22.81365
},
{
longitude: -47.07096,
latitude: -22.8137
},
{
longitude: -47.07103,
latitude: -22.81377
},
{
longitude: -47.0711,
latitude: -22.81384
},
{
longitude: -47.0711,
latitude: -22.81383
},
{
longitude: -47.07111,
latitude: -22.81383
},
{
longitude: -47.07112,
latitude: -22.81383
},
{
longitude: -47.07113,
latitude: -22.81382
},
{
longitude: -47.07114,
latitude: -22.81382
},
{
longitude: -47.07115,
latitude: -22.81382
},
{
longitude: -47.07116,
latitude: -22.81382
},
{
longitude: -47.07117,
latitude: -22.81382
},
{
longitude: -47.07118,
latitude: -22.81382
},
{
longitude: -47.07119,
latitude: -22.81382
},
{
longitude: -47.0712,
latitude: -22.81382
},
{
longitude: -47.07121,
latitude: -22.81383
},
{
longitude: -47.07122,
latitude: -22.81383
},
{
longitude: -47.07123,
latitude: -22.81383
},
{
longitude: -47.07123,
latitude: -22.81384
},
{
longitude: -47.07124,
latitude: -22.81384
},
{
longitude: -47.07124,
latitude: -22.81385
},
{
longitude: -47.07132,
latitude: -22.81386
},
{
longitude: -47.07134,
latitude: -22.81387
},
{
longitude: -47.07136,
latitude: -22.81388
},
{
longitude: -47.07138,
latitude: -22.81388
},
{
longitude: -47.07139,
latitude: -22.81389
},
{
longitude: -47.0714,
latitude: -22.8139
},
{
longitude: -47.07172,
latitude: -22.81414
},
{
longitude: -47.07197,
latitude: -22.81435
},
{
longitude: -47.07209,
latitude: -22.81447
},
{
longitude: -47.0722,
latitude: -22.81459
},
{
longitude: -47.0723,
latitude: -22.81472
},
{
longitude: -47.07238,
latitude: -22.81483
},
{
longitude: -47.0724,
latitude: -22.81486
},
{
longitude: -47.07248,
latitude: -22.815
},
{
longitude: -47.07256,
latitude: -22.81516
},
{
longitude: -47.07263,
latitude: -22.81532
},
{
longitude: -47.07268,
latitude: -22.81549
},
{
longitude: -47.07273,
latitude: -22.81566
},
{
longitude: -47.07277,
latitude: -22.81583
},
{
longitude: -47.07279,
latitude: -22.81601
},
{
longitude: -47.07281,
latitude: -22.81619
},
{
longitude: -47.07282,
latitude: -22.81637
},
{
longitude: -47.07282,
latitude: -22.81656
},
{
longitude: -47.07281,
latitude: -22.81674
},
{
longitude: -47.0728,
latitude: -22.81684
},
{
longitude: -47.07277,
latitude: -22.81717
},
{
longitude: -47.07276,
latitude: -22.81727
},
{
longitude: -47.07272,
latitude: -22.81761
},
{
longitude: -47.07271,
latitude: -22.81775
},
{
longitude: -47.0727,
latitude: -22.81783
},
{
longitude: -47.07266,
latitude: -22.81803
},
{
longitude: -47.0726605,
latitude: -22.8180312,
type: "waypoint",
polyline: "tsgjCb{h~G?@@B?@@B?@@@?B@@?@@@?@@@@@?@@@@@@@B@@@B?@@B@@?B@b@f@^^rAxAFFZ\Z^TTTTn@n@n@r@n@p@n@n@p@p@n@p@z@`Ab@j@tArAJLNNzA`Bz@bADDDDjApAtBtBFFZV\^zAbBDJBHBP@J",
dir: "At <b>Praça Henfil</b>, take the <b>2nd</b> exit onto <b>Av. Professor Atílio Martini</b> heading to <b>Barão Geraldo</b>",
step: "roundabout-right",
nextturn: "roundabout-right",
dist: {
val: 1053,
txt: "1.1 km",
total: 2933
},
timeto: {
val: 156,
txt: "3 mins"
}
},
{
longitude: -47.07267,
latitude: -22.81803
},
{
longitude: -47.07269,
latitude: -22.81804
},
{
longitude: -47.0727,
latitude: -22.81804
},
{
longitude: -47.07272,
latitude: -22.81805
},
{
longitude: -47.07273,
latitude: -22.81805
},
{
longitude: -47.07274,
latitude: -22.81806
},
{
longitude: -47.07276,
latitude: -22.81806
},
{
longitude: -47.07277,
latitude: -22.81807
},
{
longitude: -47.07278,
latitude: -22.81807
},
{
longitude: -47.07279,
latitude: -22.81808
},
{
longitude: -47.0728,
latitude: -22.81808
},
{
longitude: -47.07281,
latitude: -22.81809
},
{
longitude: -47.07282,
latitude: -22.8181
},
{
longitude: -47.07283,
latitude: -22.8181
},
{
longitude: -47.07284,
latitude: -22.81811
},
{
longitude: -47.07285,
latitude: -22.81812
},
{
longitude: -47.07286,
latitude: -22.81813
},
{
longitude: -47.07287,
latitude: -22.81815
},
{
longitude: -47.07288,
latitude: -22.81816
},
{
longitude: -47.07288,
latitude: -22.81818
},
{
longitude: -47.07289,
latitude: -22.81819
},
{
longitude: -47.0729,
latitude: -22.81821
},
{
longitude: -47.0729,
latitude: -22.81822
},
{
longitude: -47.07291,
latitude: -22.81824
},
{
longitude: -47.07311,
latitude: -22.81842
},
{
longitude: -47.07327,
latitude: -22.81858
},
{
longitude: -47.07372,
latitude: -22.819
},
{
longitude: -47.07376,
latitude: -22.81904
},
{
longitude: -47.07391,
latitude: -22.81918
},
{
longitude: -47.07407,
latitude: -22.81932
},
{
longitude: -47.07418,
latitude: -22.81943
},
{
longitude: -47.07429,
latitude: -22.81954
},
{
longitude: -47.07453,
latitude: -22.81978
},
{
longitude: -47.07479,
latitude: -22.82002
},
{
longitude: -47.07504,
latitude: -22.82026
},
{
longitude: -47.07528,
latitude: -22.8205
},
{
longitude: -47.07553,
latitude: -22.82075
},
{
longitude: -47.07578,
latitude: -22.82099
},
{
longitude: -47.07611,
latitude: -22.82129
},
{
longitude: -47.07633,
latitude: -22.82147
},
{
longitude: -47.07675,
latitude: -22.8219
},
{
longitude: -47.07682,
latitude: -22.82196
},
{
longitude: -47.0769,
latitude: -22.82204
},
{
longitude: -47.07739,
latitude: -22.8225
},
{
longitude: -47.07773,
latitude: -22.8228
},
{
longitude: -47.07776,
latitude: -22.82283
},
{
longitude: -47.07779,
latitude: -22.82286
},
{
longitude: -47.0782,
latitude: -22.82324
},
{
longitude: -47.07879,
latitude: -22.82383
},
{
longitude: -47.07883,
latitude: -22.82387
},
{
longitude: -47.07895,
latitude: -22.82401
},
{
longitude: -47.07911,
latitude: -22.82416
},
{
longitude: -47.07961,
latitude: -22.82462
},
{
longitude: -47.07967,
latitude: -22.82465
},
{
longitude: -47.07972,
latitude: -22.82467
},
{
longitude: -47.07981,
latitude: -22.82469
},
{
longitude: -47.07987,
latitude: -22.8247
},
{
longitude: -47.0798692,
latitude: -22.8247031,
type: "waypoint",
polyline: "j}hjCdhj~G}AXuAV[Do@PO@}AVi@LiDh@uCh@",
dir: "Turn <b>right</b> onto <b>Av. Albino J. B. de Oliveira</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 418,
txt: "0.4 km",
total: 3351
},
timeto: {
val: 57,
txt: "1 min"
}
},
{
longitude: -47.08,
latitude: -22.82423
},
{
longitude: -47.08012,
latitude: -22.8238
},
{
longitude: -47.08015,
latitude: -22.82366
},
{
longitude: -47.08024,
latitude: -22.82342
},
{
longitude: -47.08025,
latitude: -22.82334
},
{
longitude: -47.08037,
latitude: -22.82287
},
{
longitude: -47.08044,
latitude: -22.82266
},
{
longitude: -47.08065,
latitude: -22.82181
},
{
longitude: -47.08086,
latitude: -22.82106
},
{
longitude: -47.0808591,
latitude: -22.8210574,
type: "waypoint",
polyline: "rfhjCjnj~GBLRdBDPDRJd@HVx@`B",
dir: "Turn <b>left</b> onto <b>R. Maria Ferreira Antunes</b>",
step: "turn-left",
nextturn: "turn-left",
dist: {
val: 176,
txt: "0.2 km",
total: 3527
},
timeto: {
val: 40,
txt: "1 min"
}
},
{
longitude: -47.08093,
latitude: -22.82108
},
{
longitude: -47.08144,
latitude: -22.82118
},
{
longitude: -47.08153,
latitude: -22.82121
},
{
longitude: -47.08163,
latitude: -22.82124
},
{
longitude: -47.08182,
latitude: -22.8213
},
{
longitude: -47.08194,
latitude: -22.82135
},
{
longitude: -47.08243,
latitude: -22.82164
},
{
longitude: -47.0824306,
latitude: -22.8216413,
type: "waypoint",
polyline: "fjhjCdxj~GfBLjAh@d@T",
dir: "Continue onto <b>R. Agostinho Pátaro</b>",
dist: {
val: 130,
txt: "0.1 km",
total: 3657
},
timeto: {
val: 21,
txt: "1 min"
}
},
{
longitude: -47.0825,
latitude: -22.82216
},
{
longitude: -47.08271,
latitude: -22.82254
},
{
longitude: -47.08282,
latitude: -22.82273
},
{
longitude: -47.082824,
latitude: -22.8227301,
type: "waypoint",
polyline: "`qhjCrzj~GA@GFIJEHKRGTETET?BCPA^A\@\@^D\?BDVDZHXXnARt@Rr@",
dir: "Turn <b>right</b> onto <b>Rua Jerônimo Páttaro</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 306,
txt: "0.3 km",
total: 3963
},
timeto: {
val: 46,
txt: "1 min"
}
},
{
longitude: -47.08283,
latitude: -22.82272
},
{
longitude: -47.08287,
latitude: -22.82268
},
{
longitude: -47.08293,
latitude: -22.82263
},
{
longitude: -47.08298,
latitude: -22.8226
},
{
longitude: -47.08308,
latitude: -22.82254
},
{
longitude: -47.08319,
latitude: -22.8225
},
{
longitude: -47.0833,
latitude: -22.82247
},
{
longitude: -47.08341,
latitude: -22.82244
},
{
longitude: -47.08343,
latitude: -22.82244
},
{
longitude: -47.08352,
latitude: -22.82242
},
{
longitude: -47.08368,
latitude: -22.82241
},
{
longitude: -47.08383,
latitude: -22.8224
},
{
longitude: -47.08398,
latitude: -22.82241
},
{
longitude: -47.08414,
latitude: -22.82242
},
{
longitude: -47.08429,
latitude: -22.82245
},
{
longitude: -47.08431,
latitude: -22.82245
},
{
longitude: -47.08443,
latitude: -22.82248
},
{
longitude: -47.08457,
latitude: -22.82251
},
{
longitude: -47.0847,
latitude: -22.82256
},
{
longitude: -47.0851,
latitude: -22.82269
},
{
longitude: -47.08537,
latitude: -22.82279
},
{
longitude: -47.08563,
latitude: -22.82289
},
{
longitude: -47.0856292,
latitude: -22.8228877,
type: "waypoint",
polyline: "`rhjCdlk~GO^[z@[v@CHQ^K\k@pAMROROPs@t@a@`@EDCBQRQR_BhBCDOPSXQXMZM\I\I\c@pBQv@i@dCGRGNCHM`@_@~@K\K^G^G^MhAEXALAN",
dir: "Turn <b>right</b> onto <b>Av. Santa Isabel</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 893,
txt: "0.9 km",
total: 4856
},
timeto: {
val: 123,
txt: "2 mins"
}
},
{
longitude: -47.08579,
latitude: -22.82281
},
{
longitude: -47.08609,
latitude: -22.82267
},
{
longitude: -47.08637,
latitude: -22.82253
},
{
longitude: -47.08642,
latitude: -22.82251
},
{
longitude: -47.08658,
latitude: -22.82242
},
{
longitude: -47.08673,
latitude: -22.82236
},
{
longitude: -47.08714,
latitude: -22.82214
},
{
longitude: -47.08724,
latitude: -22.82207
},
{
longitude: -47.08734,
latitude: -22.82199
},
{
longitude: -47.08743,
latitude: -22.82191
},
{
longitude: -47.0877,
latitude: -22.82165
},
{
longitude: -47.08787,
latitude: -22.82148
},
{
longitude: -47.0879,
latitude: -22.82145
},
{
longitude: -47.08792,
latitude: -22.82143
},
{
longitude: -47.08802,
latitude: -22.82134
},
{
longitude: -47.08812,
latitude: -22.82125
},
{
longitude: -47.08865,
latitude: -22.82077
},
{
longitude: -47.08868,
latitude: -22.82075
},
{
longitude: -47.08877,
latitude: -22.82067
},
{
longitude: -47.0889,
latitude: -22.82057
},
{
longitude: -47.08903,
latitude: -22.82048
},
{
longitude: -47.08917,
latitude: -22.82041
},
{
longitude: -47.08932,
latitude: -22.82034
},
{
longitude: -47.08947,
latitude: -22.82029
},
{
longitude: -47.08962,
latitude: -22.82024
},
{
longitude: -47.09019,
latitude: -22.82006
},
{
longitude: -47.09047,
latitude: -22.81997
},
{
longitude: -47.09114,
latitude: -22.81976
},
{
longitude: -47.09124,
latitude: -22.81972
},
{
longitude: -47.09132,
latitude: -22.81968
},
{
longitude: -47.09137,
latitude: -22.81966
},
{
longitude: -47.09154,
latitude: -22.81959
},
{
longitude: -47.09186,
latitude: -22.81943
},
{
longitude: -47.09201,
latitude: -22.81937
},
{
longitude: -47.09217,
latitude: -22.81931
},
{
longitude: -47.09233,
latitude: -22.81927
},
{
longitude: -47.09249,
latitude: -22.81923
},
{
longitude: -47.09286,
latitude: -22.81916
},
{
longitude: -47.09299,
latitude: -22.81913
},
{
longitude: -47.09306,
latitude: -22.81912
},
{
longitude: -47.09314,
latitude: -22.81911
},
{
longitude: -47.0931362,
latitude: -22.8191058,
type: "waypoint",
polyline: "lzgjCb{l~GcBc@MAKAM?C@",
dir: "Turn <b>right</b> onto <b>R. Armando Sebastião Bonome</b>/<b>R. Armando Sebastião Bonomi</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 83,
txt: "83 m",
total: 4939
},
timeto: {
val: 17,
txt: "1 min"
}
},
{
longitude: -47.09296,
latitude: -22.81861
},
{
longitude: -47.09295,
latitude: -22.81854
},
{
longitude: -47.09294,
latitude: -22.81848
},
{
longitude: -47.09294,
latitude: -22.81841
},
{
longitude: -47.09295,
latitude: -22.81839
},
{
longitude: -47.0929467,
latitude: -22.8183891,
type: "waypoint",
polyline: "|ugjC|yl~GYzAW|A",
dir: "Turn <b>left</b> onto <b>R. Luís Vicentim Sobrinho</b>",
step: "turn-left",
nextturn: "turn-left",
dist: {
val: 100,
txt: "0.1 km",
total: 5039
},
timeto: {
val: 19,
txt: "1 min"
}
},
{
longitude: -47.09341,
latitude: -22.81826
},
{
longitude: -47.09388,
latitude: -22.81814
},
{
longitude: -47.0938829,
latitude: -22.8181411,
type: "waypoint",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 378,
txt: "0.4 km",
total: 5417
},
timeto: {
val: 92,
txt: "2 mins"
}
},
{
longitude: -47.09415,
latitude: -22.81721
},
{
longitude: -47.09439,
latitude: -22.81635
},
{
longitude: -47.09483,
latitude: -22.81493
},
{
longitude: -47.09485,
latitude: -22.81486
},
{
longitude: -47.0948505,
latitude: -22.8148564,
type: "waypoint"
}

          ]
        },
        {
          "type": "bicycle",
          "pois": [{
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }, {
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }],
          "points": [
{
longitude: -47.0587654,
latitude: -22.8142571,
type: "waypoint",
polyline: "b|fjChdf~GAAA?A?AAA?A?A@A?A?A@A?A?A@A@A@A@A@?@?@A@?@?@A@?@?@?@?@?@?@@??@?@@@?@",
dir: "Head <b>north</b> toward <b>Av. Alan Turing</b>",
dist: {
val: 38,
txt: "38 m",
total: 38
},
timeto: {
val: 20,
txt: "1 min"
}
},
{
longitude: -47.05876,
latitude: -22.81425
},
{
longitude: -47.05876,
latitude: -22.81424
},
{
longitude: -47.05876,
latitude: -22.81423
},
{
longitude: -47.05875,
latitude: -22.81422
},
{
longitude: -47.05875,
latitude: -22.81421
},
{
longitude: -47.05875,
latitude: -22.8142
},
{
longitude: -47.05876,
latitude: -22.81419
},
{
longitude: -47.05876,
latitude: -22.81418
},
{
longitude: -47.05876,
latitude: -22.81417
},
{
longitude: -47.05877,
latitude: -22.81416
},
{
longitude: -47.05877,
latitude: -22.81415
},
{
longitude: -47.05877,
latitude: -22.81414
},
{
longitude: -47.05878,
latitude: -22.81413
},
{
longitude: -47.05879,
latitude: -22.81412
},
{
longitude: -47.0588,
latitude: -22.81411
},
{
longitude: -47.05881,
latitude: -22.8141
},
{
longitude: -47.05882,
latitude: -22.81409
},
{
longitude: -47.05883,
latitude: -22.81409
},
{
longitude: -47.05884,
latitude: -22.81409
},
{
longitude: -47.05885,
latitude: -22.81408
},
{
longitude: -47.05886,
latitude: -22.81408
},
{
longitude: -47.05887,
latitude: -22.81408
},
{
longitude: -47.05888,
latitude: -22.81407
},
{
longitude: -47.05889,
latitude: -22.81407
},
{
longitude: -47.0589,
latitude: -22.81407
},
{
longitude: -47.05891,
latitude: -22.81407
},
{
longitude: -47.05892,
latitude: -22.81407
},
{
longitude: -47.05893,
latitude: -22.81407
},
{
longitude: -47.05894,
latitude: -22.81407
},
{
longitude: -47.05894,
latitude: -22.81408
},
{
longitude: -47.05895,
latitude: -22.81408
},
{
longitude: -47.05896,
latitude: -22.81408
},
{
longitude: -47.05897,
latitude: -22.81409
},
{
longitude: -47.05898,
latitude: -22.81409
},
{
longitude: -47.0589812,
latitude: -22.8140904,
type: "waypoint",
polyline: "`{fjCref~G?@@@@@?@@?@@?@@?@@@@@?@??@@?",
dir: "Turn <b>left</b> at <b>Av. Alan Turing</b>",
step: "turn-left",
nextturn: "turn-left",
dist: {
val: 15,
txt: "15 m",
total: 53
},
timeto: {
val: 8,
txt: "1 min"
}
},
{
longitude: -47.05899,
latitude: -22.81409
},
{
longitude: -47.059,
latitude: -22.8141
},
{
longitude: -47.05901,
latitude: -22.81411
},
{
longitude: -47.05902,
latitude: -22.81411
},
{
longitude: -47.05902,
latitude: -22.81412
},
{
longitude: -47.05903,
latitude: -22.81413
},
{
longitude: -47.05904,
latitude: -22.81413
},
{
longitude: -47.05904,
latitude: -22.81414
},
{
longitude: -47.05905,
latitude: -22.81415
},
{
longitude: -47.05906,
latitude: -22.81416
},
{
longitude: -47.05906,
latitude: -22.81417
},
{
longitude: -47.05906,
latitude: -22.81418
},
{
longitude: -47.05907,
latitude: -22.81418
},
{
longitude: -47.05907,
latitude: -22.81419
},
{
longitude: -47.0590718,
latitude: -22.8141935,
type: "waypoint",
polyline: "t{fjCdff~GJQ",
dir: "Turn <b>left</b> onto <b>Av. Alan Turing</b>",
step: "turn-left",
nextturn: "turn-left",
dist: {
val: 12,
txt: "12 m",
total: 65
},
timeto: {
val: 5,
txt: "1 min"
}
},
{
longitude: -47.05898,
latitude: -22.81425
},
{
longitude: -47.0589765,
latitude: -22.8142524,
type: "waypoint",
polyline: "`|fjCref~GnD\dDXz@JhAJpALfAJhBR",
dir: "Turn <b>right</b> onto <b>R. Walter August Hadler</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 414,
txt: "0.4 km",
total: 479
},
timeto: {
val: 67,
txt: "1 min"
}
},
{
longitude: -47.05913,
latitude: -22.81513
},
{
longitude: -47.05926,
latitude: -22.81596
},
{
longitude: -47.05932,
latitude: -22.81626
},
{
longitude: -47.05938,
latitude: -22.81663
},
{
longitude: -47.05945,
latitude: -22.81704
},
{
longitude: -47.05951,
latitude: -22.8174
},
{
longitude: -47.05961,
latitude: -22.81793
},
{
longitude: -47.0596083,
latitude: -22.8179271,
type: "waypoint",
polyline: "`sgjCpif~GDJDBB~FDfG?xA?\BxA@f@?JAJAP",
dir: "At the roundabout, take the <b>1st</b> exit onto <b>Av. Dr. André Tosello</b>",
step: "roundabout-right",
nextturn: "roundabout-right",
dist: {
val: 428,
txt: "0.4 km",
total: 907
},
timeto: {
val: 60,
txt: "1 min"
}
},
{
longitude: -47.05967,
latitude: -22.81796
},
{
longitude: -47.05969,
latitude: -22.81799
},
{
longitude: -47.06097,
latitude: -22.81801
},
{
longitude: -47.06229,
latitude: -22.81804
},
{
longitude: -47.06274,
latitude: -22.81804
},
{
longitude: -47.06289,
latitude: -22.81804
},
{
longitude: -47.06334,
latitude: -22.81806
},
{
longitude: -47.06354,
latitude: -22.81807
},
{
longitude: -47.0636,
latitude: -22.81807
},
{
longitude: -47.06366,
latitude: -22.81806
},
{
longitude: -47.06375,
latitude: -22.81805
},
{
longitude: -47.0637538,
latitude: -22.8180517,
type: "waypoint",
polyline: "xsgjClcg~G?@A?ABABABABAB?BAD?B?B@B?D@B@B@BBDBBB@@@B@B@B?B@B?D?DFD@RHh@TZN`Af@NHVNRRRPPTt@dAx@fA|@pAHLVb@LPPd@Nb@N\HVx@lCxAvFP|@",
dir: "At the roundabout, take the <b>2nd</b> exit onto <b>Av. Albert Einstein</b>",
step: "roundabout-right",
nextturn: "roundabout-right",
dist: {
val: 754,
txt: "0.8 km",
total: 1661
},
timeto: {
val: 112,
txt: "2 mins"
}
},
{
longitude: -47.06376,
latitude: -22.81805
},
{
longitude: -47.06376,
latitude: -22.81804
},
{
longitude: -47.06378,
latitude: -22.81803
},
{
longitude: -47.0638,
latitude: -22.81802
},
{
longitude: -47.06382,
latitude: -22.81801
},
{
longitude: -47.06384,
latitude: -22.818
},
{
longitude: -47.06386,
latitude: -22.81799
},
{
longitude: -47.06388,
latitude: -22.81799
},
{
longitude: -47.06391,
latitude: -22.81798
},
{
longitude: -47.06393,
latitude: -22.81798
},
{
longitude: -47.06395,
latitude: -22.81798
},
{
longitude: -47.06397,
latitude: -22.81799
},
{
longitude: -47.064,
latitude: -22.81799
},
{
longitude: -47.06402,
latitude: -22.818
},
{
longitude: -47.06404,
latitude: -22.81801
},
{
longitude: -47.06406,
latitude: -22.81802
},
{
longitude: -47.06409,
latitude: -22.81804
},
{
longitude: -47.06411,
latitude: -22.81806
},
{
longitude: -47.06412,
latitude: -22.81808
},
{
longitude: -47.06413,
latitude: -22.81809
},
{
longitude: -47.06414,
latitude: -22.81811
},
{
longitude: -47.06415,
latitude: -22.81813
},
{
longitude: -47.06415,
latitude: -22.81815
},
{
longitude: -47.06416,
latitude: -22.81817
},
{
longitude: -47.06416,
latitude: -22.81819
},
{
longitude: -47.06416,
latitude: -22.81822
},
{
longitude: -47.0642,
latitude: -22.81825
},
{
longitude: -47.06421,
latitude: -22.81828
},
{
longitude: -47.06426,
latitude: -22.81838
},
{
longitude: -47.06437,
latitude: -22.81859
},
{
longitude: -47.06445,
latitude: -22.81873
},
{
longitude: -47.06465,
latitude: -22.81906
},
{
longitude: -47.0647,
latitude: -22.81914
},
{
longitude: -47.06478,
latitude: -22.81926
},
{
longitude: -47.06488,
latitude: -22.81936
},
{
longitude: -47.06497,
latitude: -22.81946
},
{
longitude: -47.06508,
latitude: -22.81955
},
{
longitude: -47.06543,
latitude: -22.81982
},
{
longitude: -47.06579,
latitude: -22.82011
},
{
longitude: -47.0662,
latitude: -22.82042
},
{
longitude: -47.06627,
latitude: -22.82047
},
{
longitude: -47.06645,
latitude: -22.82059
},
{
longitude: -47.06654,
latitude: -22.82066
},
{
longitude: -47.06673,
latitude: -22.82075
},
{
longitude: -47.06691,
latitude: -22.82083
},
{
longitude: -47.06706,
latitude: -22.82091
},
{
longitude: -47.06718,
latitude: -22.82096
},
{
longitude: -47.06789,
latitude: -22.82125
},
{
longitude: -47.06913,
latitude: -22.8217
},
{
longitude: -47.06944,
latitude: -22.82179
},
{
longitude: -47.0694369,
latitude: -22.8217875,
type: "waypoint",
nextturn: "roundabout-right",
dist: {
val: 1720,
txt: "1.7 km",
total: 3381
},
timeto: {
val: 223,
txt: "4 mins"
}
},
{
longitude: -47.06947,
latitude: -22.82175
},
{
longitude: -47.06951,
latitude: -22.82173
},
{
longitude: -47.06955,
latitude: -22.82171
},
{
longitude: -47.06959,
latitude: -22.8217
},
{
longitude: -47.06963,
latitude: -22.82169
},
{
longitude: -47.06967,
latitude: -22.82168
},
{
longitude: -47.06971,
latitude: -22.82167
},
{
longitude: -47.06974,
latitude: -22.82167
},
{
longitude: -47.06978,
latitude: -22.82168
},
{
longitude: -47.06981,
latitude: -22.82169
},
{
longitude: -47.06983,
latitude: -22.8217
},
{
longitude: -47.06985,
latitude: -22.82171
},
{
longitude: -47.06987,
latitude: -22.82172
},
{
longitude: -47.0699,
latitude: -22.82174
},
{
longitude: -47.06991,
latitude: -22.82175
},
{
longitude: -47.06993,
latitude: -22.82177
},
{
longitude: -47.06994,
latitude: -22.82178
},
{
longitude: -47.06995,
latitude: -22.82179
},
{
longitude: -47.06996,
latitude: -22.8218
},
{
longitude: -47.06997,
latitude: -22.82182
},
{
longitude: -47.06998,
latitude: -22.82183
},
{
longitude: -47.06998,
latitude: -22.82184
},
{
longitude: -47.06999,
latitude: -22.82185
},
{
longitude: -47.06999,
latitude: -22.82187
},
{
longitude: -47.07,
latitude: -22.82188
},
{
longitude: -47.07,
latitude: -22.82189
},
{
longitude: -47.07,
latitude: -22.8219
},
{
longitude: -47.07,
latitude: -22.82192
},
{
longitude: -47.07001,
latitude: -22.82193
},
{
longitude: -47.07001,
latitude: -22.82194
},
{
longitude: -47.07001,
latitude: -22.82195
},
{
longitude: -47.07001,
latitude: -22.82197
},
{
longitude: -47.07001,
latitude: -22.82198
},
{
longitude: -47.07,
latitude: -22.82199
},
{
longitude: -47.07,
latitude: -22.822
},
{
longitude: -47.07,
latitude: -22.82201
},
{
longitude: -47.07,
latitude: -22.82202
},
{
longitude: -47.06999,
latitude: -22.82203
},
{
longitude: -47.06999,
latitude: -22.82204
},
{
longitude: -47.07,
latitude: -22.82209
},
{
longitude: -47.07001,
latitude: -22.82215
},
{
longitude: -47.07003,
latitude: -22.82221
},
{
longitude: -47.07005,
latitude: -22.82227
},
{
longitude: -47.07007,
latitude: -22.82235
},
{
longitude: -47.07009,
latitude: -22.82241
},
{
longitude: -47.07013,
latitude: -22.82248
},
{
longitude: -47.0703,
latitude: -22.82274
},
{
longitude: -47.07032,
latitude: -22.82278
},
{
longitude: -47.07061,
latitude: -22.82318
},
{
longitude: -47.0707,
latitude: -22.82332
},
{
longitude: -47.07097,
latitude: -22.82369
},
{
longitude: -47.07112,
latitude: -22.82392
},
{
longitude: -47.07113,
latitude: -22.82392
},
{
longitude: -47.07148,
latitude: -22.82442
},
{
longitude: -47.07152,
latitude: -22.82448
},
{
longitude: -47.07192,
latitude: -22.82508
},
{
longitude: -47.07214,
latitude: -22.82541
},
{
longitude: -47.0723,
latitude: -22.82567
},
{
longitude: -47.0725,
latitude: -22.82596
},
{
longitude: -47.0727,
latitude: -22.82627
},
{
longitude: -47.07285,
latitude: -22.82648
},
{
longitude: -47.07312,
latitude: -22.82685
},
{
longitude: -47.07334,
latitude: -22.82717
},
{
longitude: -47.07354,
latitude: -22.82746
},
{
longitude: -47.0736,
latitude: -22.82756
},
{
longitude: -47.07378,
latitude: -22.82781
},
{
longitude: -47.07393,
latitude: -22.82803
},
{
longitude: -47.07411,
latitude: -22.8283
},
{
longitude: -47.07425,
latitude: -22.82849
},
{
longitude: -47.07461,
latitude: -22.829
},
{
longitude: -47.07475,
latitude: -22.82922
},
{
longitude: -47.07497,
latitude: -22.82954
},
{
longitude: -47.07506,
latitude: -22.82967
},
{
longitude: -47.07528,
latitude: -22.83001
},
{
longitude: -47.07583,
latitude: -22.83083
},
{
longitude: -47.07593,
latitude: -22.83097
},
{
longitude: -47.07598,
latitude: -22.83104
},
{
longitude: -47.07626,
latitude: -22.83145
},
{
longitude: -47.07658,
latitude: -22.83191
},
{
longitude: -47.07693,
latitude: -22.83241
},
{
longitude: -47.07719,
latitude: -22.8328
},
{
longitude: -47.07751,
latitude: -22.83324
},
{
longitude: -47.07756,
latitude: -22.83332
},
{
longitude: -47.07761,
latitude: -22.83338
},
{
longitude: -47.07766,
latitude: -22.83344
},
{
longitude: -47.07773,
latitude: -22.8335
},
{
longitude: -47.07774,
latitude: -22.83352
},
{
longitude: -47.07783,
latitude: -22.8336
},
{
longitude: -47.07792,
latitude: -22.83367
},
{
longitude: -47.07801,
latitude: -22.83373
},
{
longitude: -47.07812,
latitude: -22.83379
},
{
longitude: -47.07822,
latitude: -22.83384
},
{
longitude: -47.07832,
latitude: -22.83387
},
{
longitude: -47.0784,
latitude: -22.8339
},
{
longitude: -47.07849,
latitude: -22.8339
},
{
longitude: -47.07856,
latitude: -22.8339
},
{
longitude: -47.07862,
latitude: -22.83388
},
{
longitude: -47.07868,
latitude: -22.83386
},
{
longitude: -47.07874,
latitude: -22.83383
},
{
longitude: -47.07879,
latitude: -22.83378
},
{
longitude: -47.0787874,
latitude: -22.8337829,
type: "waypoint",
polyline: "bvjjClaj~GQBWBEFCHAH?H?HBHDFLFJFVJRF@@NBPBN?p@EVGFATC^A`@A`@@`@DtAPd@FRDNDt@F",
dir: "At <b>Praça General Dom José de San Martin</b>, take the <b>3rd</b> exit onto <b>Av. Albino J. B. de Oliveira</b> heading to <b>Dom Pedro I</b>/<b>SP-65</b>/<b>Campinas</b>/<b>Parque D. Pedro</b>",
step: "roundabout-right",
nextturn: "roundabout-right",
dist: {
val: 389,
txt: "0.4 km",
total: 3770
},
timeto: {
val: 58,
txt: "1 min"
}
},
{
longitude: -47.07881,
latitude: -22.83369
},
{
longitude: -47.07883,
latitude: -22.83357
},
{
longitude: -47.07887,
latitude: -22.83354
},
{
longitude: -47.07892,
latitude: -22.83352
},
{
longitude: -47.07897,
latitude: -22.83351
},
{
longitude: -47.07902,
latitude: -22.83351
},
{
longitude: -47.07907,
latitude: -22.83351
},
{
longitude: -47.07912,
latitude: -22.83353
},
{
longitude: -47.07916,
latitude: -22.83356
},
{
longitude: -47.0792,
latitude: -22.83363
},
{
longitude: -47.07924,
latitude: -22.83369
},
{
longitude: -47.0793,
latitude: -22.83381
},
{
longitude: -47.07934,
latitude: -22.83391
},
{
longitude: -47.07935,
latitude: -22.83392
},
{
longitude: -47.07937,
latitude: -22.834
},
{
longitude: -47.07939,
latitude: -22.83409
},
{
longitude: -47.07939,
latitude: -22.83417
},
{
longitude: -47.07936,
latitude: -22.83442
},
{
longitude: -47.07932,
latitude: -22.83454
},
{
longitude: -47.07931,
latitude: -22.83458
},
{
longitude: -47.07929,
latitude: -22.83469
},
{
longitude: -47.07928,
latitude: -22.83485
},
{
longitude: -47.07927,
latitude: -22.83502
},
{
longitude: -47.07928,
latitude: -22.83519
},
{
longitude: -47.07931,
latitude: -22.83536
},
{
longitude: -47.0794,
latitude: -22.83579
},
{
longitude: -47.07944,
latitude: -22.83598
},
{
longitude: -47.07947,
latitude: -22.83608
},
{
longitude: -47.0795,
latitude: -22.83616
},
{
longitude: -47.07954,
latitude: -22.83643
},
{
longitude: -47.0795396,
latitude: -22.8364341,
type: "waypoint",
polyline: "tfkjCbfj~GbAr@TPX\LTFVF\@\AZE^M`@KZWn@iAfCUf@[bAm@nAUb@qAdCmA~Bw@xAkCzE]n@qAdCu@jAk@|@}@lAw@bAWXoAtAq@p@i@f@KH}@v@eCnB}BfBIFmCxByC`Cy@p@q@d@kAz@}CbCQLMJQLaAv@cAx@aAx@]Tg@^s@j@k@b@[TaBnAm@f@qAbAq@h@_@Xk@b@gAz@SNgAx@gA|@w@n@g@`@i@`@k@b@u@j@",
dir: "Keep <b>right</b> at the fork, follow signs for <b>Rodovia Professor Zeferino Vaz</b> and merge onto <b>Rodovia Professor Zeferino Vaz</b>",
step: "fork-right",
nextturn: "fork-right",
dist: {
val: 2830,
txt: "2.8 km",
total: 6600
},
timeto: {
val: 134,
txt: "2 mins"
}
},
{
longitude: -47.0798,
latitude: -22.83677
},
{
longitude: -47.07989,
latitude: -22.83688
},
{
longitude: -47.08004,
latitude: -22.83701
},
{
longitude: -47.08015,
latitude: -22.83708
},
{
longitude: -47.08027,
latitude: -22.83712
},
{
longitude: -47.08042,
latitude: -22.83716
},
{
longitude: -47.08057,
latitude: -22.83717
},
{
longitude: -47.08071,
latitude: -22.83716
},
{
longitude: -47.08087,
latitude: -22.83713
},
{
longitude: -47.08104,
latitude: -22.83706
},
{
longitude: -47.08118,
latitude: -22.837
},
{
longitude: -47.08142,
latitude: -22.83688
},
{
longitude: -47.0821,
latitude: -22.83651
},
{
longitude: -47.0823,
latitude: -22.8364
},
{
longitude: -47.08264,
latitude: -22.83626
},
{
longitude: -47.08304,
latitude: -22.83603
},
{
longitude: -47.08322,
latitude: -22.83592
},
{
longitude: -47.08389,
latitude: -22.83551
},
{
longitude: -47.08453,
latitude: -22.83512
},
{
longitude: -47.08498,
latitude: -22.83484
},
{
longitude: -47.08608,
latitude: -22.83414
},
{
longitude: -47.08632,
latitude: -22.83399
},
{
longitude: -47.08699,
latitude: -22.83358
},
{
longitude: -47.08737,
latitude: -22.83331
},
{
longitude: -47.08768,
latitude: -22.83309
},
{
longitude: -47.08807,
latitude: -22.83278
},
{
longitude: -47.08841,
latitude: -22.8325
},
{
longitude: -47.08854,
latitude: -22.83238
},
{
longitude: -47.08897,
latitude: -22.83198
},
{
longitude: -47.08922,
latitude: -22.83173
},
{
longitude: -47.08942,
latitude: -22.83152
},
{
longitude: -47.08947,
latitude: -22.83146
},
{
longitude: -47.08975,
latitude: -22.83115
},
{
longitude: -47.09031,
latitude: -22.83048
},
{
longitude: -47.09083,
latitude: -22.82985
},
{
longitude: -47.09087,
latitude: -22.8298
},
{
longitude: -47.09148,
latitude: -22.82909
},
{
longitude: -47.09213,
latitude: -22.82832
},
{
longitude: -47.09238,
latitude: -22.82803
},
{
longitude: -47.09257,
latitude: -22.82778
},
{
longitude: -47.09287,
latitude: -22.8274
},
{
longitude: -47.09353,
latitude: -22.82661
},
{
longitude: -47.0936,
latitude: -22.82652
},
{
longitude: -47.09366,
latitude: -22.82645
},
{
longitude: -47.09373,
latitude: -22.82636
},
{
longitude: -47.09401,
latitude: -22.82603
},
{
longitude: -47.0943,
latitude: -22.82569
},
{
longitude: -47.09459,
latitude: -22.82536
},
{
longitude: -47.0947,
latitude: -22.82521
},
{
longitude: -47.09486,
latitude: -22.82501
},
{
longitude: -47.09508,
latitude: -22.82475
},
{
longitude: -47.09526,
latitude: -22.82453
},
{
longitude: -47.09537,
latitude: -22.82439
},
{
longitude: -47.09577,
latitude: -22.8239
},
{
longitude: -47.09597,
latitude: -22.82367
},
{
longitude: -47.09631,
latitude: -22.82326
},
{
longitude: -47.09652,
latitude: -22.82301
},
{
longitude: -47.09665,
latitude: -22.82285
},
{
longitude: -47.09683,
latitude: -22.82263
},
{
longitude: -47.09713,
latitude: -22.82227
},
{
longitude: -47.09721,
latitude: -22.82217
},
{
longitude: -47.0975,
latitude: -22.82181
},
{
longitude: -47.09781,
latitude: -22.82145
},
{
longitude: -47.09805,
latitude: -22.82117
},
{
longitude: -47.09822,
latitude: -22.82097
},
{
longitude: -47.09839,
latitude: -22.82076
},
{
longitude: -47.09857,
latitude: -22.82054
},
{
longitude: -47.09879,
latitude: -22.82027
},
{
longitude: -47.0987863,
latitude: -22.8202698,
type: "waypoint",
polyline: "tahjCl~m~GKFmA`AaBlAaAv@UR}DzCgAz@k@b@w@n@a@`@WV]\WXUVg@l@[`@c@p@k@z@_@r@m@fAIPmA`CGJu@~Ak@hAeCfFwDxH{CjGuBdEUh@cApB_@v@_@v@i@jAIV}@vB]v@M^IPCFO^O\Wn@a@bAKTq@`B}@vBeAjCEF_A`C",
dir: "Keep <b>left</b> to stay on <b>Rodovia Professor Zeferino Vaz</b>",
step: "keep-left",
nextturn: "keep-left",
dist: {
val: 2334,
txt: "2.3 km",
total: 8934
},
timeto: {
val: 103,
txt: "2 mins"
}
},
{
longitude: -47.09883,
latitude: -22.82021
},
{
longitude: -47.09916,
latitude: -22.81982
},
{
longitude: -47.09955,
latitude: -22.81933
},
{
longitude: -47.09983,
latitude: -22.819
},
{
longitude: -47.09993,
latitude: -22.81889
},
{
longitude: -47.10071,
latitude: -22.81794
},
{
longitude: -47.10101,
latitude: -22.81758
},
{
longitude: -47.10119,
latitude: -22.81736
},
{
longitude: -47.10143,
latitude: -22.81708
},
{
longitude: -47.1016,
latitude: -22.81691
},
{
longitude: -47.10172,
latitude: -22.81679
},
{
longitude: -47.10187,
latitude: -22.81664
},
{
longitude: -47.102,
latitude: -22.81652
},
{
longitude: -47.10212,
latitude: -22.81641
},
{
longitude: -47.10235,
latitude: -22.81621
},
{
longitude: -47.10252,
latitude: -22.81607
},
{
longitude: -47.10277,
latitude: -22.81589
},
{
longitude: -47.10307,
latitude: -22.81567
},
{
longitude: -47.10333,
latitude: -22.81551
},
{
longitude: -47.10369,
latitude: -22.81528
},
{
longitude: -47.10378,
latitude: -22.81523
},
{
longitude: -47.10443,
latitude: -22.81484
},
{
longitude: -47.10449,
latitude: -22.8148
},
{
longitude: -47.10497,
latitude: -22.81453
},
{
longitude: -47.10534,
latitude: -22.81431
},
{
longitude: -47.1065,
latitude: -22.81364
},
{
longitude: -47.10807,
latitude: -22.81272
},
{
longitude: -47.10941,
latitude: -22.81194
},
{
longitude: -47.1104,
latitude: -22.81135
},
{
longitude: -47.11061,
latitude: -22.81124
},
{
longitude: -47.11118,
latitude: -22.8109
},
{
longitude: -47.11146,
latitude: -22.81074
},
{
longitude: -47.11174,
latitude: -22.81058
},
{
longitude: -47.11212,
latitude: -22.81037
},
{
longitude: -47.11224,
latitude: -22.81032
},
{
longitude: -47.11284,
latitude: -22.81001
},
{
longitude: -47.11312,
latitude: -22.80986
},
{
longitude: -47.11328,
latitude: -22.80979
},
{
longitude: -47.11337,
latitude: -22.80974
},
{
longitude: -47.11341,
latitude: -22.80972
},
{
longitude: -47.11357,
latitude: -22.80964
},
{
longitude: -47.11372,
latitude: -22.80956
},
{
longitude: -47.11396,
latitude: -22.80944
},
{
longitude: -47.1143,
latitude: -22.80927
},
{
longitude: -47.11441,
latitude: -22.80921
},
{
longitude: -47.1149,
latitude: -22.80896
},
{
longitude: -47.1155,
latitude: -22.80865
},
{
longitude: -47.1162,
latitude: -22.8083
},
{
longitude: -47.11624,
latitude: -22.80827
},
{
longitude: -47.11689,
latitude: -22.80795
},
{
longitude: -47.116891,
latitude: -22.8079503,
type: "waypoint",
polyline: "ttejCpoq~GEFGHc@l@k@~@U^IJ",
dir: "Take the exit toward <b>Betel</b>",
step: "ramp-right",
nextturn: "ramp-right",
dist: {
val: 113,
txt: "0.1 km",
total: 9047
},
timeto: {
val: 10,
txt: "1 min"
}
},
{
longitude: -47.11693,
latitude: -22.80792
},
{
longitude: -47.11698,
latitude: -22.80788
},
{
longitude: -47.11721,
latitude: -22.8077
},
{
longitude: -47.11753,
latitude: -22.80748
},
{
longitude: -47.11769,
latitude: -22.80737
},
{
longitude: -47.11775,
latitude: -22.80732
},
{
longitude: -47.1177494,
latitude: -22.8073191,
type: "waypoint",
polyline: "vpejC|tq~GKVQ`@Q`@EL",
dir: "Continue onto <b>Estr. Mun. de Paulínia Cento e Quarenta e Seis</b>",
dist: {
val: 62,
txt: "62 m",
total: 9109
},
timeto: {
val: 8,
txt: "1 min"
}
},
{
longitude: -47.11787,
latitude: -22.80726
},
{
longitude: -47.11804,
latitude: -22.80717
},
{
longitude: -47.11821,
latitude: -22.80708
},
{
longitude: -47.11828,
latitude: -22.80705
},
{
longitude: -47.1182805,
latitude: -22.807054,
type: "waypoint",
polyline: "`oejCfxq~GkDgBaEiBKEQKu@a@iAm@qCyAm@[OIaAk@qGcD]QwIsEeEyBa@SYUWQuBgAkAg@[OqCuAwBeAcDkBcB}@wBiA_KiF}BoAiAk@gAk@mDiBAAYY?A?A?AAA?A?AA??AAAAAACA?AAAAA?AAA?A?A?A?A?A?A?A?A?A@A??@A?A@A??@A??@A@GGiB}@kAk@",
dir: "Turn <b>right</b> onto <b>Av. Alexandre Cazellatitudeo</b>",
step: "turn-right",
nextturn: "turn-right",
dist: {
val: 2369,
txt: "2.4 km",
total: 11478
},
timeto: {
val: 166,
txt: "3 mins"
}
},
{
longitude: -47.11776,
latitude: -22.80619
},
{
longitude: -47.11723,
latitude: -22.80522
},
{
longitude: -47.1172,
latitude: -22.80516
},
{
longitude: -47.11714,
latitude: -22.80507
},
{
longitude: -47.11697,
latitude: -22.8048
},
{
longitude: -47.11674,
latitude: -22.80443
},
{
longitude: -47.11629,
latitude: -22.8037
},
{
longitude: -47.11615,
latitude: -22.80347
},
{
longitude: -47.1161,
latitude: -22.80339
},
{
longitude: -47.11588,
latitude: -22.80306
},
{
longitude: -47.11506,
latitude: -22.80169
},
{
longitude: -47.11497,
latitude: -22.80154
},
{
longitude: -47.11391,
latitude: -22.79982
},
{
longitude: -47.1133,
latitude: -22.79883
},
{
longitude: -47.1132,
latitude: -22.79866
},
{
longitude: -47.11309,
latitude: -22.79853
},
{
longitude: -47.113,
latitude: -22.79841
},
{
longitude: -47.11264,
latitude: -22.79782
},
{
longitude: -47.11244,
latitude: -22.79744
},
{
longitude: -47.11236,
latitude: -22.7973
},
{
longitude: -47.11193,
latitude: -22.79657
},
{
longitude: -47.11158,
latitude: -22.79597
},
{
longitude: -47.11104,
latitude: -22.79515
},
{
longitude: -47.11073,
latitude: -22.79465
},
{
longitude: -47.11036,
latitude: -22.79405
},
{
longitude: -47.10919,
latitude: -22.79213
},
{
longitude: -47.10879,
latitude: -22.7915
},
{
longitude: -47.10857,
latitude: -22.79113
},
{
longitude: -47.10835,
latitude: -22.79077
},
{
longitude: -47.10782,
latitude: -22.7899
},
{
longitude: -47.10781,
latitude: -22.78989
},
{
longitude: -47.10768,
latitude: -22.78976
},
{
longitude: -47.10767,
latitude: -22.78976
},
{
longitude: -47.10766,
latitude: -22.78976
},
{
longitude: -47.10765,
latitude: -22.78976
},
{
longitude: -47.10764,
latitude: -22.78975
},
{
longitude: -47.10763,
latitude: -22.78975
},
{
longitude: -47.10762,
latitude: -22.78975
},
{
longitude: -47.10762,
latitude: -22.78974
},
{
longitude: -47.10761,
latitude: -22.78974
},
{
longitude: -47.1076,
latitude: -22.78973
},
{
longitude: -47.10759,
latitude: -22.78972
},
{
longitude: -47.10757,
latitude: -22.78971
},
{
longitude: -47.10757,
latitude: -22.7897
},
{
longitude: -47.10756,
latitude: -22.78969
},
{
longitude: -47.10755,
latitude: -22.78968
},
{
longitude: -47.10755,
latitude: -22.78967
},
{
longitude: -47.10754,
latitude: -22.78966
},
{
longitude: -47.10754,
latitude: -22.78965
},
{
longitude: -47.10754,
latitude: -22.78964
},
{
longitude: -47.10754,
latitude: -22.78963
},
{
longitude: -47.10754,
latitude: -22.78962
},
{
longitude: -47.10754,
latitude: -22.78961
},
{
longitude: -47.10754,
latitude: -22.7896
},
{
longitude: -47.10754,
latitude: -22.78959
},
{
longitude: -47.10754,
latitude: -22.78958
},
{
longitude: -47.10754,
latitude: -22.78957
},
{
longitude: -47.10755,
latitude: -22.78956
},
{
longitude: -47.10755,
latitude: -22.78955
},
{
longitude: -47.10756,
latitude: -22.78955
},
{
longitude: -47.10756,
latitude: -22.78954
},
{
longitude: -47.10757,
latitude: -22.78953
},
{
longitude: -47.10757,
latitude: -22.78952
},
{
longitude: -47.10758,
latitude: -22.78952
},
{
longitude: -47.10758,
latitude: -22.78951
},
{
longitude: -47.10759,
latitude: -22.78951
},
{
longitude: -47.1076,
latitude: -22.7895
},
{
longitude: -47.10756,
latitude: -22.78946
},
{
longitude: -47.10725,
latitude: -22.78893
},
{
longitude: -47.10703,
latitude: -22.78855
},
{
longitude: -47.1070289,
latitude: -22.7885527,
type: "waypoint"
}
]
        }
      ]
    }

    res.send(routes)

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



    var dummy ={
      "data": [
        {
          "type": "walk",
          "pois": [{
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }, {
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }],
          "points": [{
              "latitude": -22.814465,
              "longitude": -47.05926
            },
            {
              "latitude": -22.8144996,
              "longitude": -47.0590182
            },
            {
              "latitude": -22.8173196,
              "longitude": -47.0668999
            }
          ]
        },
        {
          "endereco": "avenida",
          "type": "bicycle",
          "pois": [{
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }, {
            "type": "keeper",
            "name": "Jairo Iglesias",
            "point": {
              "latitude": -22.814465,
              "longitude": -47.05926
            }
          }],
          "points": [{
              "latitude": -22.814565,
              "longitude": -47.05926
            },
            {
              "latitude": -22.8145096,
              "longitude": -47.0590182
            },
            {
              "latitude": -22.8173296,
              "longitude": -47.0668999
            }
          ]
        }
      ]
    }

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
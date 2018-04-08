
module.exports = function(app){

  app.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' })

  })

  app.post('/get_keepers', (req, res) => {



  })

  app.post('/get_stops', (req, res) => {

    var lat = req.body.lat
    var lng = req.body.lng

    var conn = require('./../libs/connectdb.js')()

    var sql = "SELECT * FROM stops"
    conn.query(sql, function(err, rows, fields){
      res.send(rows)
    })
  })

}


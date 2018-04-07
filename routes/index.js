
module.exports = function(app){
  
  app.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' })

  })

  app.post('/get_keepers', (req, res) => {



  })

}


var express = require("express"),
  router = express.Router();

router.get('/', function(req,res){
  res.render("portfolio")
})


router.get('/yelpcamp', function(req,res){
  res.render("yelpcamp");
})

router.get('/gameOfLife', function(req,res){
  res.render('gameOfLife');
})

router.get('/ballotBox', function(req, res){
  res.render('ballotBox');
})

router.get('/colorGame', function(req, res){
  res.render('colorGame');
})

router.get('/dungeonCrawler', function(req, res){
  res.render('dungeonCrawler');
})

router.get('/simon', function(req, res){
  res.render('simon');
})

module.exports = router;

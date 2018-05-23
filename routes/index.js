var express = require("express"),
  router = express.Router();

var exec = require("child_process").exec;

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

// router.get("/index.php", function(req,res){
//   //res.redirect("/");
//   if(req.query.name){
//     console.log("Send an email bro!")
//
//     var name = req.query.name,
//       email = req.query.email,
//       phone = req.query.phone,
//       message = req.query.message;
//
//     var msg = "Message received from contact me form: \n  Name: " + name + "\n  Email: " +email + "\n  Phone Number: " + phone + "\n  Message: " + message;
//
//     exec("echo '" + msg + "' | mail -s 'Portfolio Query from " + req.query.name + "' benjamin.danen@gmail.com");
//   }
//
//   res.render("reload");
// })

module.exports = router;

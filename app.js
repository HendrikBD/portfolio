var express = require("express"),
  app = express(),
  bodyParser=require("body-parser");

var sys = require("util"),
  exec = require("child_process").exec;

var indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRoutes);

app.post("/email", function(req, res){
 
  var msg = "Message received from contact me form: \n  Name: " + req.body.name + "\n  Email: " + req.body.email + "\n  Phone Number: " + req.body.phone + "\n  Message: " + req.body.message;
  
  exec("echo '" + msg + "' | mail -s 'Portfolio Query from " + req.body.name + "' benjamin.danen@gmail.com");

  res.redirect("/");
})

app.listen(3000, function(){
    console.log("The server has started listening at port 3000");
  }
)

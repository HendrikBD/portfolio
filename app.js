var express = require("express"),
  app = express(),
  bodyParser=require("body-parser");

var sys = require("util"),
  exec = require("child_process").exec;

var indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/emailRedirect', function(req, res){

	var name = req.query.name,
      email = req.query.email,
      phone = req.query.phone,
      message = req.query.message;

    console.log("Email sent from " + name);
 
    var msg = "Message received from contact me form: \n  Name: " + name + "\n  Email: " +email + "\n  Phone Number: " + phone + "\n  Message: " + message;

  
    exec("echo '" + msg + "' | mail -s 'Portfolio Query from " + req.query.name + "' benjamin.danen@gmail.com");

  res.render("reload");

})

app.use('/', indexRoutes);

// app.get("/email", function(req, res){
//
//   var name = req.query.name,
//     email = req.query.email,
//     phone = req.query.phone,
//     message = req.query.message;
//  
//   var msg = "Message received from contact me form: \n  Name: " + name + "\n  Email: " +email + "\n  Phone Number: " + phone + "\n  Message: " + message;
//
//   //console.log(req.query);
//   //console.log(msg);
//   
//   exec("echo '" + msg + "' | mail -s 'Portfolio Query from " + req.body.name + "' benjamin.danen@gmail.com");
//
//   res.render("reload");
// })

app.listen(3000, function(){
    console.log("The server has started listening at port 3000");
  }
)

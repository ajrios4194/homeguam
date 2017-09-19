var express                = require("express"),
    app                    = express(),
    mongoose               = require("mongoose"),
    passport               = require("passport"),
    bodyParser             = require("body-parser"),
    User                   = require("./models/user"),
    Applicant              = require("./models/applicant"),
    LocalStrategy          = require("passport-local"),
    methodOverride         = require("method-override"),
    passportLocalMongoose  = require("passport-local-mongoose");
    
var promise = mongoose.connect('mongodb://localhost/home_guam_users', {
  useMongoClient: true,
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.use(require("express-session")({
   secret: "Helping Guamanian youth",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("APP IS RUNNING"); 
});

//====================
//ROUTES
//====================

//Log-in




//LANDING PAGE
app.get("/", function(req,res) {
   res.render("landing"); 
});

//ALUMNI
app.get("/community/alumni", function(req,res) {
   res.render("alumnilist"); 
});

//MENTORS
app.get("/community/mentors", function(req,res){
   res.render("mentorlist")
});

//HOME Team
app.get("/community/hometeam", function(req,res){
   res.render("hometeam")
});



//APPLICATION PAGE
app.get("/apply", function(req,res) {
   res.render("application"); 
});

//applied page
app.get("/congrats", function(req,res){
   res.render("congrats");
});



//logout
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

//PREMEDICAL APPLICATION
app.get("/premed", function(req,res) {
   res.render("premedapp"); 
});

app.post("/premed", function(req, res){
   Applicant.create(req.body.appl, function(err, newApplicant){
      if(err){
         res.render("application");
         console.log(err);
      } else {
         res.redirect("/congrats");
      }
   });
});


//HIGH SCHOOL APPLICATION
app.get("/hs", function(req,res) {
   res.render("hsapp"); 
});

app.post("/hs", function(req, res){
   Applicant.create(req.body.appl, function(err, newApplicant){
      if(err){
         res.render("application");
         console.log(err);
      } else {
         res.redirect("/congrats");
      }
   });
});
//Show applicant route
app.get("/admin/:id", function(req,res){
   Applicant.findById(req.params.id, function(err, foundApplicant){
      if(err){
         res.redirect("/admin");
      } else {
         res.render("show", {applicant:foundApplicant});
      }   
   });
});


//ADMIN
app.get("/admin", isAdmin, function(req,res) {
   Applicant.find({}, function(err, applicants) {
      if(err) {
         console.log('error');
      } else {
         res.render("admin", {applicants:applicants}); 
      }
   });  
});

//MENTOR SHOW
app.get("/mentorshow", isAdmin, function(req,res) {
   User.find({role:2}, function(err, mentors) {
      if(err) {
         console.log('error');
      } else {
         res.render("mentorshow", {mentors:mentors}); 
      }
   });  
});


//MENTOR DASHBOARD
app.get("/homementor/:id", isMentor, function(req,res){
  User.findById(req.params.id, function (err, user){
     if(err) {
        console.log(err);
     } else {
        res.render("homementor", {user: user});
        console.log(user);
     }
  })
});



//LOGIN ROUTES
app.get("/login", function(req,res) {
    res.render("login");
});
      
app.post('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      if (req.user.role === 1) {
         return res.redirect('/admin');
      } else if (req.user.role === 2) {
         return res.redirect('/homementor/' + user.id);
      } else if (req.user.role ===3) {
         return res.redirect('/student/' + user.id)
      }
    });
 })(req, res, next);
});

//MIDDLEWARE TO DETERMINE USER TYPES
function isAdmin(req,res,next) {
   if(req.isAuthenticated()) {
      if(req.user.role === 1){
          return next();
      } 
   }
   res.send("yikes");
}

//MENTOR OPT-IN STATUS
app.put("/homementor/:id", function(req,res){
   User.findByIdAndUpdate(req.params.id,req.body.user,function(err, updatedStatus){
      if(err){
         res.redirect("/homementor");
      } else {
         res.redirect("/homementor/"+ req.params.id);
      }
   })
});

function isMentor(req,res,next) {
   if(req.isAuthenticated()) {
      if(req.user.role === 2){
          return next();
      }
   }
   res.send("yikes");
}


//TEST ACCOUNTS
 
// User.register(new User({username: "homemedicalprogram@gmail.com", role: 1}), "password");
// // User.register(new User({username: "student@gmail.com", role: 3}), "password");
// // User.register(new User({username: "Dr. del Rosario", role: 2}), "password");
// User.register(new User({username: "Dr. Berg", role: 2, opt: 1, mentees: 3}), "password");
// // User.register(new User({username: "Dr. Shieh", role: 2, opt: 2, mentees: null}), "password");
// // User.register(new User({username: "Dr. Carlos", role: 2, opt: 1, mentees: 2}), "password");
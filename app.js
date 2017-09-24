var express                = require("express"),
    app                    = express(),
    mongoose               = require("mongoose"),
    passport               = require("passport"),
    bodyParser             = require("body-parser"),
    User                   = require("./models/user"),
    Applicant              = require("./models/applicant"),
    LocalStrategy          = require("passport-local"),
    methodOverride         = require("method-override"),
    passportLocalMongoose  = require("passport-local-mongoose"),
    homepageRoutes         = require("./routes/homepage"),
    adminRoutes            = require("./routes/admin"),
    mentorRoutes           = require("./routes/homementor");
    
var promise = mongoose.connect('mongodb://localhost/home_guam_users', {
  useMongoClient: true,
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
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

app.use(homepageRoutes);
app.use("/admin",adminRoutes);
app.use("/homementor",mentorRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("APP IS RUNNING"); 
});





//TEST ACCOUNTS
 
// User.register(new User({username: "homemedicalprogram@gmail.com",role:1}), "password");
// User.register(new User({username: "student@gmail.com",role:3}), "password");
// User.register(new User({username: "Dr.del Rosario",role: 2,opt: 1,mentees:1}), "password");
// User.register(new User({username: "Dr.Shieh",role:2,opt: 2,mentees:1}), "password");

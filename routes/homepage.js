var express = require("express"),
    router  = express.Router(),
    Applicant = require("../models/applicant.js"),
    passport = require("passport");


//HOMEPAGE NAV ROUTES
//===================

//LANDING PAGE
router.get("/", function(req,res) {
   res.render("landing"); 
});

//ALUMNI
router.get("/community/alumni", function(req,res) {
   res.render("alumnilist"); 
});

//MENTORS
router.get("/community/mentors", function(req,res){
   res.render("mentorlist")
});

//HOME Team
router.get("/community/hometeam", function(req,res){
   res.render("hometeam")
});

//APPLICATION PAGE
router.get("/apply", function(req,res) {
   res.render("application"); 
});

//applied page
router.get("/congrats", function(req,res){
   res.render("congrats");
});


//logout
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});


//PREMEDICAL APPLICATION
router.get("/premed", function(req,res) {
   res.render("premedapp"); 
});

router.post("/premed", function(req, res){
   Applicant.create(req.body.appl, function(err, newApplicant){
      if(err){
         res.render("application");
         console.log(err);
      } else {
         res.redirect("/congrats");
      }
   });
});

//DONATE
router.get("/donate", function(req,res){
   res.render("donate");
});

//HIGH SCHOOL APPLICATION
router.get("/hs", function(req,res) {
   res.render("hsapp"); 
});

router.post("/hs", function(req, res){
   Applicant.create(req.body.appl, function(err, newApplicant){
      if(err){
         res.render("application");
         console.log(err);
      } else {
         res.redirect("/congrats");
      }
   });
});

//LOGIN ROUTES
router.get("/login", function(req,res) {
    res.render("login");
});
      
router.post('/login', function(req, res, next) {
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
         return res.redirect('/student/' + user.id);
      }
    });
 })(req, res, next);
});

module.exports = router;
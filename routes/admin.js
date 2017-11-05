var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user.js"),
    Applicant = require("../models/applicant.js"),
    passport = require("passport");

//ADMIN's MENTOR STATUS PAGE
router.get("/mentors", isAdmin, function(req,res) {
   User.find({role:2}, function(err, mentors) {
      if(err) {
         console.log('error');
      } else {
         res.render("mentorshow", {mentors:mentors}); 
      }
   });
});

//ADMIN's ADD MENTOR PAGE
router.get("/mentors/add", isAdmin, function(req,res) {
   res.send("mentoradd");
});

router.post("/mentors/add", function(req,res) {
   User.create(req.body.nmentor, function(err, newMentor){
      if(err){
         res.render("/mentors/add");
         console.log(err);
      } else {
         res.redirect("/mentors");
      }
   });
});

//DONATIONS ADMIN PAGE
router.get("/donations", isAdmin, function(req, res){
    // request(url, function(error, response, body){
    //     if(!error && response.statusCode == 200) {
    //         var data = JSON.parse(body)
    //         res.render("results", {data: data});
    //     }
    // });
    res.send("donations page coming soon!");
});

//ADMIN MAIN
router.get("/", function(req,res) {
   Applicant.find({}, function(err, applicants) {
      if(err) {
         console.log('error');
      } else {
         res.render("admin", {applicants:applicants}); 
      }
   }); 
});

//Show applicant route
router.get("/:id", isAdmin, function(req,res){
   Applicant.findById(req.params.id, function(err, foundApplicant){
      if(err){
         res.redirect("/admin");
      } else {
         res.render("show", {applicant:foundApplicant});
      }   
   });
});



//MIDDLEWARE TO DETERMINE USER TYPE
function isAdmin(req,res,next) {
   if(req.isAuthenticated()) {
      if(req.user.role === 1){
          return next();
      } 
   }
   // redirect to login page with a warning "youve been logged out"
   res.send("yikes");
}


module.exports = router;

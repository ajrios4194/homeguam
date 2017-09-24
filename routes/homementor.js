var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user.js");


//MENTOR'S DASHBOARD MAIN
router.get("/:id", isMentor, function(req,res){
  User.findById(req.params.id, function (err, user){
     if(err) {
        console.log(err);
     } else {
        res.render("homementor", {user: user});
        console.log(user);
     }
  });
});




//MENTOR OPT-IN STATUS
router.put("/:id", function(req,res){
   User.findByIdAndUpdate(req.params.id,req.body.user,function(err, updatedStatus){
      if(err){
         res.redirect("/homementor");
      } else {
         res.redirect("/homementor/"+ req.params.id);
      }
   });
});

//MIDDLEWARE TO DETERMINE USER TYPE

function isMentor(req,res,next) {
   if(req.isAuthenticated()) {
      if(req.user.role === 2){
          return next();
      }
   }
   res.send("yikes");
}


module.exports = router;

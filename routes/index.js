var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

//Register Form Route (Sign up)
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
                            //username from form
    var newUser = new User({username: req.body.username});
                            //password from form
    //user signs up                        
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //if problem with signing up, render error, and render form again
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        //we log user in, authenticate, then redirect to /campgrounds
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handle login logic
                //from passport-local-mongoose
                //takes req.body.password, req.body.username and authenticates
                //based on hash stored in database
                router.post("/login", passport.authenticate("local", 
//app.post("/login", middleware, callback)
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
       }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/campgrounds");
});

module.exports = router;
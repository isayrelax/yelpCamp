var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user")
    seedDB          = require("./seeds")

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");

//backup option of database access went wrong
var url = process.env.DATABASEURL || "mongodb://lolhost/yelp_camp_v9"
mongoose.connect(url);


console.log(process.env.DATABASEURL);
//connect to yelp_camp addafssdatabase (didnt exist when code first ran)
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb+srv://useruser2:QY2wRkcnKdNV38X@cluster0.zvmvz.mongodb.net/<dbname>?retryWrites=true",
// {useNewUrlParser: true, 
//     useCreateIndex: true, 
//     useUnifiedTopology: true
// });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Honda Fit maybe",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//will call this function on every single route
app.use(function(req, res, next){
                            //will be empty if no one signed in
                            //or will contain name and user id of current user
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});

var campgrounds = [
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWYYJu_pQAPHqvtNbSDsAciJUcSsTwiUlEHg&usqp=CAU"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYYTtKnRHV9HgqmDtqT4WhzyTZ88iFVzms8Q&usqp=CAU"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYsIXUawqHQiZLeyWg7YKnnBd5o5DjZOjzpA&usqp=CAU"},
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWYYJu_pQAPHqvtNbSDsAciJUcSsTwiUlEHg&usqp=CAU"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYYTtKnRHV9HgqmDtqT4WhzyTZ88iFVzms8Q&usqp=CAU"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYsIXUawqHQiZLeyWg7YKnnBd5o5DjZOjzpA&usqp=CAU"},
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWYYJu_pQAPHqvtNbSDsAciJUcSsTwiUlEHg&usqp=CAU"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYYTtKnRHV9HgqmDtqT4WhzyTZ88iFVzms8Q&usqp=CAU"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYsIXUawqHQiZLeyWg7YKnnBd5o5DjZOjzpA&usqp=CAU"},
];

app.use(authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


// Tell Express to listen for requests (start server)
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("The YelpCamp Server Has Started!!");
}); 
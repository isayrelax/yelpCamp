var mongoose = require("mongoose");

//SCHEMA SETUP, new items can be added
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//compounding the schema into a model, blueprint for what "Campground will look like
//incorporating code we can use
module.exports = mongoose.model("campground", campgroundSchema);
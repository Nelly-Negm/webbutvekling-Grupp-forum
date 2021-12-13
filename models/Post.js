const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({ //The different inputs that is required when creating a new post.
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Post", PostSchema);
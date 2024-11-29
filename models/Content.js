const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    content: {
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    },

    images: {
        type: String,
        require: false
    },

    videos: {
        type: String,
        require: false
    }

}, {
    timestamps: true
})


const News = mongoose.model('News', newsSchema);
module.exports = News
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },

    shortUrlCode: {
        type: String,
        required: true,
        unique: true
    },

    clicks: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
)

const Url = mongoose.model('Urls', schema);
export default Url;
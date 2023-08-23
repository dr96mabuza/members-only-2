const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;
const messageSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: user, required: true},
    timestamp: {type: Date, default: Date.now},
    title: {type: String, required: true, minLength: 2},
    message: {type: String, required: true},
});

messageSchema.virtual("url").get(() => {
    return `/messages/${this._id}`;
});

module.exports = mongoose.model("Message", messageSchema);
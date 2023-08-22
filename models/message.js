const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const messageSchema = new Schema({
    {user: {type: Schema.Types.ObjectId, required: true}},
    {timestamp: {type: Date, default: new Date()}},
    {message: {type: String, required: true}},
});

messageSchema.virtual("url").get(() => {
    return `/messages/${this._id}`;
});

module.exports = mongoose.model("Message", messageSchema);
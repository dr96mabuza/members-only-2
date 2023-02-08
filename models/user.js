const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 50},
    last_name: {type: String, required: true, maxLength: 50},
    email: {type: String, required: true},
    date_of_birth: {type: Date},
    date_created: {type: Date, default: Date.now},
    password: {type: String, required: true, minLength: 8}
});

UserSchema.virtual("url").get(function () {
  return `/user/${this.id}`;
});

module.exports = mongoose.model("User", UserSchema);
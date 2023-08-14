require('dotenv').config();
const mongoose = require("mongoose");

// connect to database
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.MONGODB_USER }:${process.env.MONGODB_PASSWORD }@cluster0.fvsxm3m.mongodb.net/?retryWrites=true&w=majority`;
main().catch(err => console.log(err))
async function main() {
  await mongoose.connect(mongoDB)
}
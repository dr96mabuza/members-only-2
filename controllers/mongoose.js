// connect to database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://admin:2JpQfjIXywT7yXkJ@cluster0.fvsxm3m.mongodb.net/?retryWrites=true&w=majority"
main().catch(err => console.log(err))
async function main() {
  await mongoose.connect(mongoDB)
}
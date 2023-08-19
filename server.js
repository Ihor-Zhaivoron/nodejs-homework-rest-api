const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);
const DB_HOST="mongodb+srv://Ihorok:Makarosha2208@@cluster0.dbmxdyh.mongodb.net/db_contacts?retryWrites=true&w=majority"

const app = require('./app')



mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// ///
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

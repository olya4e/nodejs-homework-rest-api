const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

async function start() {
  try {
    await mongoose.connect(DB_HOST);

    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our Api on port: 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
start();

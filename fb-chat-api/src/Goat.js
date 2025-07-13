const path = require("path");
const fs = require("fs-extra");

const main = async () => {
  console.log("🔁 Starting Goat Bot...");

  // Load env variables if any
  require("dotenv").config();

  // Load the main index
  require(path.join(__dirname, "..", "index.js"));
};

main().catch(err => {
  console.error("❌ Failed to start Goat Bot:", err);
});

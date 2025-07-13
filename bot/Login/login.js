const { login } = require("fca-unofficial");
const fs = require("fs-extra");
const path = require("path");

module.exports = async function () {
  const appStatePath = path.join(__dirname, "../../../account.txt");

  if (!fs.existsSync(appStatePath)) {
    throw new Error("⚠️ account.txt ফাইল মিসিং!");
  }

  const appState = JSON.parse(fs.readFileSync(appStatePath, "utf-8"));

  login({ appState }, (err, api) => {
    if (err) {
      console.error("❌ Login Failed:", err);
      return process.exit(1);
    }

    global.GoatBot.fcaApi = api;
    global.GoatBot.botID = api.getCurrentUserID();
    console.log("✅ Login Successful!");

    require("../handler/index.js")(api);
  });
};

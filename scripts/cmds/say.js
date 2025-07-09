const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/exe/main/baseApiUrl.json");
  return base.data.mahmud
};

module.exports = {
  config: {
    name: "say",
    version: "1.7",
    author: "MahMUD",
    countDown: 5,
    role: 0,
    category: "media",
    guide: "{pn} <text> (or reply to a message)",
  },

  onStart: async function ({ api, message, args, event }) {
    let text = args.join(" ");

    if (event.type === "message_reply" && event.messageReply.body) {
      text = event.messageReply.body;
    }

    if (!text) {
      return message.reply("âš ï¸ à¦¦à§Ÿà¦¾ à¦•à¦°à§‡ à¦•à¦¿à¦›à§ à¦²à¦¿à¦–à§à¦¨ à¦¬à¦¾ à¦à¦•à¦Ÿà¦¿ à¦®à§‡à¦¸à§‡à¦œà§‡ à¦°à¦¿à¦ªà§à¦²à¦¾à¦‡ à¦¦à¦¿à¦¨!");
    }

    try {
      const baseUrl = await baseApiUrl();
      const response = await axios.get(`${baseUrl}/api/say`, {
        params: { text },
        headers: { "Author": module.exports.config.author },
        responseType: "stream",
      });

      if (response.data.error) {
        return message.reply(`âŒ Error: ${response.data.error}`);
      }

      message.reply({
        body: "",
        attachment: response.data,
      });

    } catch (e) {
      console.error("API Error:", e.response ? e.response.data : e.message);
      message.reply("ðŸ¥ à¦¦à§à¦ƒà¦–à¦¿à¦¤, à¦•à¦¿à¦›à§ à¦à¦•à¦Ÿà¦¾ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à§Ÿà§‡à¦›à§‡!\n\nfix Author name\n" + (e.response?.data?.error || e.message));
    }
  },
};

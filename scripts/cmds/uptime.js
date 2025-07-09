module.exports = {
  config: {
    name: "uptime",
    aliases: ["up"],
    version: "1.0",
    author: "GoatMart",
    role: 0,
    shortDescription: "Show bot uptime",
    longDescription: {
      en: "Displays how long the bot has been running continuously."
    },
    category: "system",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    const totalSeconds = process.uptime();
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let uptimeMessage = `ðŸ¦† Bot Uptime:\n`;
    if (days) uptimeMessage += `â€¢ Days   : ${days}\n`;
    if (hours) uptimeMessage += `â€¢ Hours  : ${hours}\n`;
    if (minutes) uptimeMessage += `â€¢ Minutes: ${minutes}\n`;
    uptimeMessage += `â€¢ Seconds: ${seconds}`;

    return api.sendMessage(uptimeMessage, event.threadID, event.messageID);
  }
};

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder().setDescription("Sends bot latency in ms"),
  async execute(client, interaction) {
    interaction.reply({
      content: `**API Latency**: \`${client.ws.ping}ms\``,
    });
  },
};

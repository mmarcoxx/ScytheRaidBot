const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder().setDescription("Sends bot latency in ms"),
  OWNER: true,
  async execute(client, interaction) {
    let guilds = client.guilds.cache;

    interaction.reply({
      embeds: [
        {
          description: `${guilds.map((guild) => `${guild.name}\n`)}`,
        },
      ],
    });
  },
};

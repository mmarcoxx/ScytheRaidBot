const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder().setDescription(
    "Gives information about server"
  ),
  async execute(client, interaction) {
    const { guild } = interaction;

    await interaction.reply({
      embeds: [
        {
          author: {
            name: "Tecca Bot",
            icon_url: "https://media.discordapp.net/attachments/1074364277483388948/1077576571105316864/triskelion.gif?width=432&height=432"
          },
          title: `${guild.name}'s Information`,
          thumbnail: {
            url: guild.iconURL(),
          },
          description: `> **${guild.channels.cache.size} Channels**\n> **${guild.members.cache.size} Users**\n> **${guild.roles.cache.size} Roles**`,
        },
      ],
    });
  },
};

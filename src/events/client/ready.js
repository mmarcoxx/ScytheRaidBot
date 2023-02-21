module.exports = (client) => {
  console.log(`Bot started as ${client.user.tag}`.green);

  if (client?.application?.commands) {
    client.application.commands.set(client.commandsArray);

    console.log(`${client.commands.size} Commands published`.green);
  }
};

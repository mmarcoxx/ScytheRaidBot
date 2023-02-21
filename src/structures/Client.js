const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
  PresenceUpdateStatus,
  Collection,
} = require("discord.js");
const BotUtils = require("./Utils");

module.exports = class extends Client {
  constructor(
    options = {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.Reaction,
      ],
      allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
      },
      presence: {
        activities: [
          {
            name: config.status.name,
            type: ActivityType[config.status.type],
          },
        ],
        status: PresenceUpdateStatus.DoNotDisturb,
      },
    }
  ) {
    super({
      ...options,
    });

    this.commands = new Collection();
    this.commandsArray = [];
    this.utils = new BotUtils(this);

    this.start();
  }

  async loadCommands() {
    console.log("Loading Slash Commands".yellow);
    await this.commands.clear();
    this.commandsArray = [];

    const FILES_PATH = await this.utils.loadFiles("/src/commands");

    if (FILES_PATH.length)
      FILES_PATH.forEach((PATH) => {
        try {
          const COMMAND = require(PATH);
          const COMMAND_NAME = PATH.split("\\")
            .pop()
            .split("/")
            .pop()
            .split(".")[0];
          COMMAND.CMD.name = COMMAND_NAME;

          if (COMMAND_NAME) this.commands.set(COMMAND_NAME, COMMAND);

          this.commandsArray.push(COMMAND.CMD.toJSON());
        } catch (err) {
          console.error(`Error loading file ${PATH}`.bgRed);
          console.error(err);
        }
      });

    console.log(`${this.commands.size} Commands loaded`.green);

    if (this?.application?.commands) {
      this.application.commands.set(this.commandsArray);

      console.log(`${this.commands.size} Commands published`.green);
    }
  }

  async loadHandlers() {
    console.log("Loading Handlers".yellow);
    await this.commands.clear();
    this.commandsArray = [];

    const FILES_PATH = await this.utils.loadFiles("/src/handlers");

    if (FILES_PATH.length)
      FILES_PATH.forEach((PATH) => {
        try {
          require(PATH)(this);
        } catch (err) {
          console.error(`Error loading file ${PATH}`.bgRed);
          console.error(err);
        }
      });

    console.log(`${FILES_PATH.length} Handlers loaded`.green);
  }

  async loadEvents() {
    console.log("Loading Events".yellow);
    this.removeAllListeners();

    const FILES_PATH = await this.utils.loadFiles("/src/events");

    if (FILES_PATH.length)
      FILES_PATH.forEach((PATH) => {
        try {
          const EVENT = require(PATH);
          const EVENT_NAME = PATH.split("\\")
            .pop()
            .split("/")
            .pop()
            .split(".")[0];

          console.log(EVENT_NAME);

          this.on(EVENT_NAME, EVENT.bind(null, this));
        } catch (err) {
          console.error(`Error loading file ${PATH}`.bgRed);
          console.error(err);
        }
      });

    console.log(`${FILES_PATH.length} Events loaded`.green);
  }

  async start() {
    await this.loadHandlers();
    await this.loadEvents();
    await this.loadCommands();

    this.login(config.token);
  }
};

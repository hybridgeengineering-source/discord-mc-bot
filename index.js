const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const app = express();

let data = {
  online: 0,
  max: 0,
  modes: {}
};

app.use(express.json());

app.post("/update", (req, res) => {
  data = req.body;
  res.send("OK");
});

app.get("/", (_, res) => {
  res.send("Bot online");
});

app.listen(3000);

client.on("ready", () => {
  console.log("Bot encendido");
});

client.on("interactionCreate", async i => {
  if (!i.isChatInputCommand()) return;

  if (i.commandName === "status") {
    i.reply(`🟢 Online: ${data.online}/${data.max}`);
  }

  if (i.commandName === "players") {
    let msg = "🎮 Players por modalidad\n";
    for (const m in data.modes) {
      msg += `**${m}**: ${data.modes[m]}\n`;
    }
    i.reply(msg);
  }
});

client.login(process.env.TOKEN);

const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const app = express();

let data = {
  online: 18,
  max: 100,
  modes: {
    "Survival Custom": 18,
    "Próximamente": "Whitelist"
  }
};

app.use(express.json());

// Minecraft → Discord
app.post("/update", (req, res) => {
  data = req.body;
  res.send("OK");
});

app.get("/", (_, res) => {
  res.send("Bot online");
});

app.listen(3000);

client.once("ready", () => {
  console.log("Bot encendido");
});

client.on("interactionCreate", async i => {
  if (!i.isChatInputCommand()) return;

  // /status
  if (i.commandName === "status") {
    await i.reply(
`**(Java & Bedrock)**
**IP:** Exilion.cc
**Puerto:** 19009
**Modalidad:** Survival Custom (🟢 ON)
**SERVER:** 🟢 Encendido`
    );
  }

  // /players
  if (i.commandName === "players") {
    await i.reply(
`° **Survival Custom:** ${data.modes["Survival Custom"]}
° **Próximamente:** Whitelist
° **Próximamente:** Whitelist`
    );
  }
});

client.login(process.env.TOKEN);

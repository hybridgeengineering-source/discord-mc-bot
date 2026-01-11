const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "status",
    description: "Muestra el estado del servidor"
  },
  {
    name: "players",
    description: "Muestra los jugadores por modalidad"
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("Comandos listos");
  } catch (e) {
    console.error(e);
  }
})();

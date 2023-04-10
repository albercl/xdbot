import { REST } from "discord.js";
import { config } from "dotenv";
import { Routes } from "discord-api-types/v9";
import { XDStats } from "../commands/XDStats";

config();

const token = process.env.TOKEN;
const clientId = process.env.APPLICATIONID;

const commands = [XDStats.toJSON()];

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        await rest.put(
            Routes.applicationGuildCommands(clientId, "796755518274273330"),
            {
                body: commands,
            }
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

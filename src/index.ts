import { Client } from "discord.js";
import sequelize from "./Sequelize";
import { User } from "./model/User";
import { XDStats } from "./commands/XDStats";

sequelize.sync({ alter: true });

const client = new Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
});

client.on("ready", () => {
    console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const [user] = await User.findOrCreate({
        where: { id: message.author.id },
        defaults: {
            id: message.author.id.toString(),
            username: message.author.username,
            xdcount: 0,
            messagecount: 0,
        },
    });

    user.messagecount++;

    if (message.content.toLowerCase().includes("xd"))
        user.xdcount += message.content.match(/xd/gi)?.length || 0;

    await user.save();

    console.log(user.toJSON());
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === XDStats.name) {
            const user = await User.findOne({
                where: { id: interaction.user.id.toString() },
            });

            if (user) {
                await interaction.reply(
                    `Has enviado ${
                        user.messagecount
                    } mensajes y has escrito 'xd' ${
                        user.xdcount
                    } veces.\nEl porcentaje de 'xd' por mensaje es del ${(
                        (user.xdcount / user.messagecount) *
                        100
                    ).toFixed(2)}%`
                );
            } else {
                await interaction.reply(
                    "Aún no has enviado ningún mensaje. Envía uno para que pueda calcular tus estadísticas."
                );
            }
        }
    }
});

client.login(process.env.TOKEN);

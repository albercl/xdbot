import { Client } from "discord.js";
import sequelize from "./Sequelize";
import { XDStatsExecute } from "./commands/XDStats/XDStats";
import { Member } from "./model/Member";

const sequelizePromise = sequelize.sync({ alter: true });

const client = new Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
});

client.on("ready", () => {
    console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    const [member] = await Member.findOrCreate({
        where: { userId: message.author.id, guildId: message.guild.id },
        defaults: {
            userId: message.author.id.toString(),
            guildId: message.guild.id.toString(),
            messageCount: 0,
            xdCount: 0,
        },
    });

    member.messageCount++;

    if (message.content.toLowerCase().includes("xd")) {
        const xdCount = message.content.match(/xd/gi)?.length || 0;
        member.xdCount += xdCount;
    }

    await member.save();
});

client.on("interactionCreate", async (interaction) => {
    await XDStatsExecute(interaction);
});

sequelizePromise.then(async () => {
    console.log("Database is ready! Logging in...");
    await client.login(process.env.TOKEN);
});

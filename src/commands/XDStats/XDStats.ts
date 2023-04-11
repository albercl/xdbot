import { Interaction, SlashCommandBuilder } from "discord.js";
import { XDStatsGlobal, XDStatsGlobalExecute } from "./XDStatsGlobal";
import { XDStatsUser, XDStatsUserExecute } from "./XDStatsUser";
import { XDStatsGuild, XDStatsGuildExecute } from "./XDStatsGuild";

export const XDStats = new SlashCommandBuilder()
    .setName("xdstats")
    .setDescription("Consulta tus estadísticas de 'xd'")
    .addSubcommand(XDStatsGlobal)
    .addSubcommand(XDStatsUser)
    .addSubcommand(XDStatsGuild);

export const XDStatsExecute = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;
    if (!interaction.isCommand()) return;

    switch (interaction.options.getSubcommand()) {
        case XDStatsGlobal.name:
            await XDStatsGlobalExecute(interaction);
            break;
        case XDStatsUser.name:
            await XDStatsUserExecute(interaction);
            break;
        case XDStatsGuild.name:
            await XDStatsGuildExecute(interaction);
            break;
    }
};

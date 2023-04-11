import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from "discord.js";
import { Member } from "../../model/Member";

export const XDStatsGlobal = new SlashCommandSubcommandBuilder()
    .setName("global")
    .setDescription(
        "Consulta tus estadísticas de 'xd' en todos los servidores"
    );

export const XDStatsGlobalExecute = async (
    interaction: ChatInputCommandInteraction
) => {
    const guildStats = await Member.findOne({
        group: ["guildId"],
        attributes: ["messageCount", "xdCount"],
    });

    await interaction.reply(
        `En total se han enviado ${guildStats.messageCount} mensajes y se han escrito 'xd' ${guildStats.xdCount} veces.\n` +
            `El porcentaje de 'xd' por mensaje es del ${(
                (guildStats.xdCount / guildStats.messageCount) *
                100
            ).toFixed(2)}%`
    );
};

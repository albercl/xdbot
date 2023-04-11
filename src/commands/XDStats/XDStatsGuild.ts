import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from "discord.js";
import { Member } from "../../model/Member";
import sequelize from "../../Sequelize";

export const XDStatsGuild = new SlashCommandSubcommandBuilder()
    .setName("server")
    .setDescription("Consulta las estadísticas de 'xd' de este servidor");

export const XDStatsGuildExecute = async (
    interaction: ChatInputCommandInteraction
) => {
    const guildStats = await Member.findOne({
        where: { guildId: interaction.guild.id },
        group: ["guildId"],
        attributes: [
            [
                sequelize.fn("SUM", sequelize.col("messageCount")),
                "messageCount",
            ],
            [sequelize.fn("SUM", sequelize.col("xdCount")), "xdCount"],
        ],
    });

    if (!guildStats)
        return interaction.reply(
            "Aún no se han enviado mensajes en este servidor. Envía uno para que pueda calcular las estadísticas."
        );

    await interaction.reply(
        `En total se han enviado ${guildStats.messageCount} mensajes y se han escrito 'xd' ${guildStats.xdCount} veces en este servidor.\n` +
            `El porcentaje de 'xd' por mensaje es del ${(
                (guildStats.xdCount / guildStats.messageCount) *
                100
            ).toFixed(2)}%`
    );
};

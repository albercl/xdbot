import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    SlashCommandUserOption,
} from "discord.js";
import { Member } from "../../model/Member";

export const XDStatsUser = new SlashCommandSubcommandBuilder()
    .setName("usuario")
    .setDescription("Consulta las estadísticas de 'xd' de un usuario")
    .addUserOption(
        new SlashCommandUserOption()
            .setName("usuario")
            .setDescription(
                "El usuario del que quieres consultar las estadísticas de 'xd'"
            )
    );

export const XDStatsUserExecute = async (
    interaction: ChatInputCommandInteraction
) => {
    let user = interaction.options.getUser("usuario", false);
    if (!user) user = interaction.user;

    const globalStats = await Member.findOne({
        where: { userId: user.id },
        group: ["userId"],
        attributes: ["messageCount", "xdCount"],
    });

    const guildStats = await Member.findOne({
        where: { userId: user.id, guildId: interaction.guild.id },
    });

    if (globalStats) {
        let reply = `${user.toString()} (${user.username}) ha enviado ${
            globalStats.messageCount
        } mensajes y has escrito 'xd' ${
            globalStats.xdCount
        } veces.\nEl porcentaje de 'xd' por mensaje es del ${(
            (globalStats.xdCount / globalStats.messageCount) *
            100
        ).toFixed(2)}%`;

        if (guildStats) {
            reply +=
                `\n\n` +
                `Ha enviado en este servidor ${
                    guildStats.messageCount
                } mensajes y ha escrito 'xd' ${
                    guildStats.xdCount
                } veces.\nEl porcentaje de 'xd' por mensaje es del ${(
                    (guildStats.xdCount / guildStats.messageCount) *
                    100
                ).toFixed(2)}%`;
        }

        await interaction.reply(reply);
    } else {
        await interaction.reply(
            "Aún no has enviado ningún mensaje. Envía uno para que pueda calcular tus estadísticas."
        );
    }
};

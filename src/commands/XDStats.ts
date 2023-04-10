import {
    Interaction,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandUserOption,
} from "discord.js";
import { User } from "../model/User";

export const XDStatsGlobal = new SlashCommandSubcommandBuilder()
    .setName("global")
    .setDescription(
        "Consulta tus estadísticas de 'xd' en todos los servidores"
    );

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

export const XDStats = new SlashCommandBuilder()
    .setName("xdstats")
    .setDescription("Consulta tus estadísticas de 'xd'")
    .addSubcommand(XDStatsGlobal)
    .addSubcommand(XDStatsUser);

export const XDStatsExecute = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;
    if (!interaction.isCommand()) return;

    interaction.options.getUser("usuario");

    switch (interaction.options.getSubcommand()) {
        case XDStatsGlobal.name:
            const messages = await User.sum("messagecount");
            const xds = await User.sum("xdcount");

            await interaction.reply(
                `En total se han enviado ${messages} mensajes y se han escrito 'xd' ${xds} veces.\n` +
                    `El porcentaje de 'xd' por mensaje es del ${(
                        (xds / messages) *
                        100
                    ).toFixed(2)}%`
            );
            break;
        case XDStatsUser.name:
            let discordUser = interaction.options.getUser("usuario", false);
            if (!discordUser) discordUser = interaction.user;

            const user = await User.findOne({
                where: { id: discordUser.id.toString() },
            });

            if (user) {
                await interaction.reply(
                    `${discordUser.username} ha enviado ${
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
            break;
    }
};

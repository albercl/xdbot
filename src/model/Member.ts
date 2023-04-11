import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Sequelize";

type MemberAttributes = {
    userId: string;
    guildId: string;

    messageCount: number;
    xdCount: number;
};

type MemberCreationAttributes = Optional<
    Optional<MemberAttributes, "messageCount">,
    "xdCount"
>;

export class Member extends Model<MemberAttributes, MemberCreationAttributes> {
    declare userId: string;
    declare guildId: string;

    declare messageCount: number;
    declare xdCount: number;
}

Member.init(
    {
        userId: {
            type: DataTypes.STRING(25),
            primaryKey: true,
        },
        guildId: {
            type: DataTypes.STRING(25),
            primaryKey: true,
        },
        messageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        xdCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { sequelize, tableName: "member" }
);

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Sequelize";

type UserAttributes = {
    id: string;
    username: string;
    xdcount: number;
    messagecount: number;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> {
    declare id: string;
    declare username: string;
    declare xdcount: number;
    declare messagecount: number;
}

User.init(
    {
        id: {
            type: DataTypes.STRING(25),
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        xdcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        messagecount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { sequelize, tableName: "user" }
);

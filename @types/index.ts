import { Model, ModelCtor } from "sequelize-typescript";

export interface ConnectionProductionENVType {
	databaseURL: string;
	models: string[] | ModelCtor<Model<any, any>>[];
}

export interface ConnectionDevelopmentENVType {
	models: string[] | ModelCtor<Model<any, any>>[];
	database: string;
	username: string;
	password: string;
	dialect: string;
	host: string;
	port: string | number;
}

export type ConnectionType = ConnectionProductionENVType & ConnectionDevelopmentENVType;

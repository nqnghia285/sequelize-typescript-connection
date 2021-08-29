import { config } from "dotenv";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "./@types";

config();

export interface IConnectionProductionMode extends ConnectionProductionENVType {}

export interface IConnectionDevelopmentMode extends ConnectionDevelopmentENVType {}

export interface IConnection extends ConnectionType {}

/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params IConnectionProductionMode
 * @returns Sequelize
 */
export function connectWithSSL(params: IConnectionProductionMode): Sequelize {
	return new Sequelize(params.databaseURL, {
		models: params.models,
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		define: {
			freezeTableName: true,
			timestamps: true,
		},
	});
}

/**
 * @method connectWithOptions Connect to database with options
 * @param params IConnectionDevelopmentMode
 * @returns Sequelize
 */
export function connectWithOptions(params: IConnectionDevelopmentMode): Sequelize {
	return new Sequelize(params.database, params.username, params.password, {
		models: params.models,
		dialect: dialectConvert(params.dialect),
		dialectOptions: {
			host: params.host,
			port: params.port,
			user: params.username,
			password: params.password,
			database: params.database,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		define: {
			freezeTableName: true,
			timestamps: true,
		},
	});
}

/**
 * @method connect Create a connection to database by Sequelize
 * @param params IConnection
 * @returns Sequelize
 */
export function connect(params: IConnection): Sequelize {
	if (process.env.NODE_ENV === "production") {
		const connection: IConnectionProductionMode = params;
		return connectWithSSL(connection);
	} else {
		const connection: IConnectionDevelopmentMode = params;
		return connectWithOptions(connection);
	}
}

/**
 * @method dialectConvert Convert a string to Dialect
 * @param dialect string | undefined
 * @returns Dialect
 */
export function dialectConvert(dialect: string | undefined): Dialect {
	const mysql: Dialect = "mysql";
	const postgres: Dialect = "postgres";
	const sqlite: Dialect = "sqlite";
	const mariadb: Dialect = "mariadb";
	const mssql: Dialect = "mssql";

	switch (dialect) {
		case "mysql":
			return mysql;
		case "postgres":
			return postgres;
		case "sqlite":
			return sqlite;
		case "mariadb":
			return mariadb;
		case "mssql":
			return mssql;
		default:
			return "postgres";
	}
}

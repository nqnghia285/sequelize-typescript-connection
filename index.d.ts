import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "./@types";

export declare interface IConnectionProductionMode extends ConnectionProductionENVType {}

export declare interface IConnectionDevelopmentMode extends ConnectionDevelopmentENVType {}

export declare interface IConnection extends ConnectionType {}

/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params IConnectionProductionMode
 * @returns Sequelize
 */
export declare function connectWithSSL(params: IConnectionProductionMode): Sequelize;

/**
 * @method connectWithOptions Connect to database with options
 * @param params IConnectionDevelopmentMode
 * @returns Sequelize
 */
export declare function connectWithOptions(params: IConnectionDevelopmentMode): Sequelize;

/**
 * @method connect Create a connection to database by Sequelize
 * @param params IConnection
 * @returns Sequelize
 */
export declare function connect(params: IConnection): Sequelize;

/**
 * @method dialectConvert Convert a string to Dialect
 * @param dialect string | undefined
 * @returns Dialect
 */
export declare function dialectConvert(dialect: string | undefined): Dialect;

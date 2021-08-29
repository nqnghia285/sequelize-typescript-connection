# Sequelize Connection [![Build Status](https://github.com/Links2004/arduinoWebSockets/workflows/CI/badge.svg?branch=master)](https://github.com/nqnghia285/sequelize-typescript-connection.git)

Sequelize Connection support us to connect to database.

### Functions:

```typescript
/**
 * @method connectWithSSL Connect to batabase by ssl
 * @param params IConnectionProductionMode
 * @returns Sequelize
 */
function connectWithSSL(params: IConnectionProductionMode): Sequelize;
```

```typescript
/**
 * @method connectWithOptions Connect to database with options
 * @param params IConnectionDevelopmentMode
 * @returns Sequelize
 */
function connectWithOptions(params: IConnectionDevelopmentMode): Sequelize;
```

```typescript
/**
 * @method connect Create a connection to database by Sequelize
 * @param params IConnection
 * @returns Sequelize
 */
function connect(params: IConnection): Sequelize;
```

```typescript
/**
 * @method dialectConvert Convert a string to Dialect
 * @param dialect string | undefined
 * @returns Dialect
 */
function dialectConvert(dialect: string | undefined): Dialect;
```

### Example:

```typescript
// ES6
// Connection.ts
import { connect, connectWithSSL, connectWithOptions } from "sequelize-typescript-connection";
import { Sequelize } from "sequelize-typescript";
import { ConnectionDevelopmentENVType, ConnectionProductionENVType, ConnectionType } from "sequelize-typescript-connection/dist/@types";

// Variables of production environment
const databaseURL = process.env.DATABASE_URL || "your-database-url";
const models = ["path of models folder"];

const connection: IConnectionProductionMode = {
    databaseURL: databaseURL,
    models: models,
};

const sequelize = connectWithSSL(connection);

......
// Variables of development environment
const models = ["path of models folder"];
const database = process.env.DATABASE || "your-database";
const user = process.env.USER || "postgres";
const password = process.env.PASSWORD || "your-password ";
const host = process.env.HOST || "0.0.0.0";
const dialect = process.env.DIALECT || "postgres";
const databasePort = process.env.DATABASE_PORT || "5432";

const connection: IConnectionDevelopmentMode = {
    models: models,
    database: database,
    username: user,
    password: password,
    dialect: dialect,
    host: host,
    port: databasePort,
};

const sequelize = connectWithOptions(connection);


......
// Variables of production environment
const models = ["path of models folder"];
const databaseURL = process.env.DATABASE_URL || "your-database-url";

// Variables of development environment
const database = process.env.DATABASE || "your-database";
const user = process.env.USER || "postgres";
const password = process.env.PASSWORD || "your-password ";
const host = process.env.HOST || "0.0.0.0";
const dialect = process.env.DIALECT || "postgres";
const databasePort = process.env.DATABASE_PORT || "5432";


const connection: IConnection = {
    models: models,
    databaseURL: databaseURL,
    database: database,
    username: user,
    password: password,
    dialect: dialect,
    host: host,
    port: databasePort
};

const sequelize = connect(connection);

......
// User.model.ts
import { Sequelize, Table, Column, Model } from "sequelize-typescript";
import { SMALLINT, STRING }

// Define model
@Table
class User extends Model<User> {
   @Column({type: SMALLINT, primaryKey: true, autoIncrement: true })
   public id!: number;

   @Column({type: STRING, allowNull: false, validate: { isEmail: true, len: [10, 30] } })
   public username!: string;

   @Column({type: STRING, allowNull: false, validate: { len: [10, 20] } })
   public password!: string;
}
export default User;
......
// DefineAssociationAndSync.ts
// Sync models in database
(async () => {
    await sequelize.sync();
    await sequelize.models.User.create({ username: "admin@gmail.com", password: "acbxyz" });
})();
```

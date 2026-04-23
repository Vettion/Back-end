const knex = require('knex');

const { config } = require('./config.js');

console.log('Config DB:', config?.db);
if (!config?.db) {
    console.error('¡ERROR! config.db no existe. Revisa la ruta del config!');
    process.exit(1);
}

const db = knex({
    client: 'mysql',
    connection: {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    },
    useNullAsDefault: true
});

exports.db = db;
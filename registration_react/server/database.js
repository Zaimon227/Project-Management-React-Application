const { Model } = require('objection');
const Knex = require('knex');

    const knex = Knex({
        client: 'mssql',
        connection: {
            server: 'localhost',
            user: 'sa',
            password: 'secret123',
            database: 'phonebookCRUD',
            options: {
                port: 17122
            }
        }
    });

Model.knex(knex);

module.exports = knex;
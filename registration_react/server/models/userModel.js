const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'tbUsers';
    }
    static get idColumn() {
        return 'userid';
    }

    $beforeInsert() {
        this.created_datetime = new Date().toISOString();
    }
}

module.exports = User;
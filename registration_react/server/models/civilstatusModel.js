const { Model} = require('objection');

class CivilStatus extends Model {
    static get tableName() {
        return 'tbCivilStatus';
    }
    static get idColumn() {
        return 'civilstatusid';
    }
    $beforeInsert() {
        this.created_datetime = new Date().toISOString();
    }
}

module.exports = CivilStatus;
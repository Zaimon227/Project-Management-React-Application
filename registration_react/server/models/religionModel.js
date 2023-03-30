const { Model} = require('objection');

class Religion extends Model {
    static get tableName() {
        return 'tbReligion';
    }
    static get idColumn() {
        return 'religionid';
    }
    $beforeInsert() {
        this.created_datetime = new Date().toISOString();
    }
}

module.exports = Religion;
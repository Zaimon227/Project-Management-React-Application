const { Model} = require('objection');

class Nationality extends Model {
    static get tableName() {
        return 'tbNationality';
    }
    static get idColumn() {
        return 'nationalityid';
    }
    $beforeInsert() {
        this.created_datetime = new Date().toISOString();
    }
}

module.exports = Nationality;